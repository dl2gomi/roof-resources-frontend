'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Toaster } from '@/helpers';
import { useApiRequest } from '@/hooks';
import { avatarUrl } from '@/consts';
import { useAppSelector } from '@/store';

const Avatar = ({ avatar }) => {
  const userState = useAppSelector((state) => state.user);

  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the file size is less than 8MB (8 * 1024 * 1024 bytes)
      if (file.size > 8 * 1024 * 1024) {
        setError('File size exceeds 8MB');
        return;
      }

      setError(''); // Clear any previous error

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        setFile(reader.result);
        const base64String = reader.result.split(',')[1]; // Remove the "data:image/png;base64," part

        sendDataRequest({ image: base64String });
      };
    }
  };

  const {
    response: dataResponse,
    error: dataError,
    loading: dataLoading,
    sendRequest: sendDataRequest,
  } = useApiRequest({
    endpoint: avatarUrl,
    method: 'POST',
    headers: {
      authorization: `Bearer ${userState.token}`,
    },
  });

  useEffect(() => {
    error && Toaster.error(error);
  }, [error]);

  useEffect(() => {
    dataError && Toaster.error(dataError.message);
  }, [dataError]);

  useEffect(() => {
    if (dataResponse) {
      setSelectedImage(file);
      Toaster.success(dataResponse.message);
    }
  }, [dataResponse]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
      style={{ width: '160px', height: '160px' }}
    >
      <Image
        src={selectedImage || avatar} // Show selected image or default
        className="object-cover box-border border-[none]"
        alt="avatar"
        layout="fill"
        style={{ borderRadius: '50%' }}
      />

      {showOverlay && (
        <div
          className="absolute inset-0 bg-black flex justify-center items-center cursor-pointer"
          onClick={() => !dataLoading && document.getElementById('imageInput').click()} // Trigger the file input click
          style={{ zIndex: 1, borderRadius: '50%', opacity: '0.4' }}
        >
          <span className="text-white text-lg">{dataLoading ? 'Uploading...' : 'Change Avatar'}</span>
          <input
            id="imageInput"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*" // Accept only image files
          />
        </div>
      )}
    </div>
  );
};

export default Avatar;
