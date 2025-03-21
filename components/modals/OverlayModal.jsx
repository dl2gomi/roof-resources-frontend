'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import closesvg from '@/public/img/close.svg';

const OverlayModal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose(); // Close on Escape key
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#000000a0] bg-opacity-50"
      onClick={onClose} // Close on clicking outside
    >
      <div
        className="bg-white rounded-lg p-6 w-96 shadow-lg relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
      >
        {/* Close Button */}
        <div className="absolute flex justify-end top-3 right-3 cursor-pointer" onClick={onClose}>
          <Image src={closesvg} alt="close button" height={30} />
        </div>

        {/* Modal Header */}
        <h2 className="text-xl font-semibold mb-4 text-center uppercase text-[#292d32]">{title}</h2>

        {/* Modal Content */}
        <div className="text-gray-600">{children}</div>
      </div>
    </div>
  );
};

export default OverlayModal;
