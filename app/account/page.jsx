'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { accountInfoUrl, adminAddUrl, avatarUrl, changeUrl, profileUpdateUrl } from '@/consts';
import { useApiRequest } from '@/hooks';
import { AdminLayout } from '@/layouts';
import { Toaster, withAuth } from '@/helpers';
import { useAppDispatch, useAppSelector } from '@/store';
import { OverlayModal } from '@/components/modals';
import { Avatar, IconInput } from '@/components/widgets';
import { clearUser } from '@/store/user';
import { useRouter } from 'next/navigation';

import avatarDefault from '@/public/img/avatar-default.png';
import emailIcon from '@/public/icons/icon-email.png';
import userIcon from '@/public/icons/icon-user.png';
import autographIcon from '@/public/icons/icon-autograph.png';
import phoneIcon from '@/public/icons/icon-phone.png';
import lockIcon from '@/public/icons/icon-lock.png';
import cameraIcon from '@/public/icons/icon-camera.png';

import '@/styles/all.css';

const Account = () => {
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [profile, setProfile] = useState({});
  const [avatar, setAvatar] = useState(avatarDefault);
  const [profileModalOn, setProfileModalOn] = useState(false);
  const [passwordModalOn, setPasswordModalOn] = useState(false);
  const [adminModalOn, setAdminModalOn] = useState(false);

  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddr, setNewAddr] = useState('');
  const [newMID, setNewMID] = useState('');
  const [newAvatar, setNewAvatar] = useState(null);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const [adminEmail, setAdminEmail] = useState('');

  const {
    response: infoResponse,
    error: infoError,
    loading: infoLoading,
    sendRequest: sendInfoRequest,
  } = useApiRequest({
    endpoint: accountInfoUrl,
    method: 'GET',
    headers: {
      authorization: `Bearer ${userState.token}`,
    },
  });

  const {
    response: avatarResponse,
    error: avatarError,
    loading: avataroading,
    sendRequest: sendAvatarRequest,
  } = useApiRequest({
    endpoint: avatarUrl,
    method: 'GET',
    headers: {
      authorization: `Bearer ${userState.token}`,
    },
  });

  const {
    response: updateResponse,
    error: updateError,
    loading: updateLoading,
    sendRequest: sendUpdateRequest,
  } = useApiRequest({
    endpoint: profileUpdateUrl,
    method: 'POST',
    headers: {
      authorization: `Bearer ${userState.token}`,
    },
    data: {
      first: newFirstName,
      last: newLastName,
      mid: newMID,
      phone: newPhone,
      address: newAddr,
    },
  });

  const {
    response: changeResponse,
    error: changeError,
    loading: changeLoading,
    sendRequest: sendChangeRequest,
  } = useApiRequest({
    endpoint: changeUrl,
    method: 'POST',
    headers: {
      authorization: `Bearer ${userState.token}`,
    },
    data: {
      oldPassword,
      newPassword,
      confPassword,
    },
  });

  const {
    response: adminResponse,
    error: adminError,
    loading: adminLoading,
    sendRequest: sendAdminRequest,
  } = useApiRequest({
    endpoint: adminAddUrl,
    method: 'POST',
    headers: {
      authorization: `Bearer ${userState.token}`,
    },
    data: {
      email: adminEmail,
    },
  });

  const handleLogout = () => {
    // Clear user data from Redux store
    dispatch(clearUser());

    // Remove user data from localStorage
    localStorage.removeItem('user');

    setTimeout(() => {
      router.push('/');
    }, 200);
  };

  useEffect(() => {
    userState.token && sendInfoRequest && sendInfoRequest();
    userState.token && sendAvatarRequest && sendAvatarRequest();
  }, [userState]);

  useEffect(() => {
    if (avatarResponse && avatarResponse.data.image) {
      setAvatar(avatarResponse.data.image);
    }
  }, [avatarResponse]);

  useEffect(() => {
    if (avatarError) {
      setAvatar(avatarError.message);
    }
  }, [avatarError]);

  useEffect(() => {
    infoResponse && setProfile({ ...infoResponse.data });
    infoResponse && setNewFirstName(infoResponse.data.firstName ?? '');
    infoResponse && setNewLastName(infoResponse.data.lastName ?? '');
    infoResponse && setNewPhone(infoResponse.data.phone ?? '');
    infoResponse && setNewAvatar(infoResponse.data.avatar ?? '');
    infoResponse && setNewAddr(infoResponse.data.address ?? '');
    infoResponse && setNewMID(infoResponse.data.merchantId ?? '');
  }, [infoResponse]);

  useEffect(() => {
    infoError && Toaster.error(infoError.message);
  }, [infoError]);

  useEffect(() => {
    infoResponse && setProfile({ ...updateResponse.data });
    infoResponse && setNewFirstName(updateResponse.data.firstName ?? '');
    infoResponse && setNewLastName(updateResponse.data.lastName ?? '');
    infoResponse && setNewPhone(updateResponse.data.phone ?? '');
    infoResponse && setNewAvatar(updateResponse.data.avatar ?? '');
    infoResponse && setNewMID(updateResponse.data.merchantId ?? '');
    infoResponse && setNewAddr(updateResponse.data.address ?? '');

    infoResponse && Toaster.success(updateResponse.message);
    infoResponse && setProfileModalOn(false);
  }, [updateResponse]);

  useEffect(() => {
    updateError && Toaster.error(updateError.message);
  }, [updateError]);

  useEffect(() => {
    changeResponse && Toaster.success(changeResponse.message);
    changeResponse && setPasswordModalOn(false);
    changeResponse && setOldPassword('');
    changeResponse && setNewPassword('');
    changeResponse && setConfPassword('');
  }, [changeResponse]);

  useEffect(() => {
    changeError && Toaster.error(changeError.message);
  }, [changeError]);

  useEffect(() => {
    adminResponse && Toaster.success(adminResponse.message);
    adminResponse && router.push('/users');
  }, [adminResponse]);

  useEffect(() => {
    adminError && Toaster.error(adminError.message);
  }, [adminError]);

  return (
    <AdminLayout background="account-info">
      <div className="grid grid-cols-12 justify-center items-center basis-auto w-full">
        <div className="xl:col-start-5 xl:col-span-4 lg:col-start-5 lg:col-span-4 md:col-start-4 md:col-span-6 sm:col-start-3 sm:col-span-8 col-start-2 col-span-10 justify-center">
          <div className="flex justify-center">
            <Avatar avatar={avatar} />
          </div>
          <div className="flex justify-start items-center flex-col grow-0 shrink-0 basis-auto my-[31px]">
            <p className="[font-family:Inter,sans-serif] text-2xl font-semibold text-[#242760] m-0 p-0">
              {`${profile.firstName || ''} ${profile.lastName || ''}`}
            </p>
            <div className="mt-[19px]">
              <div className="w-full box-border">
                {profile.role === 'super' && (
                  <p className="[font-family:Poppins,sans-serif] text-center text-sm uppercase font-bold tracking-[-0.14px] text-[white] bg-[green] whitespace-pre-wrap m-0 p-2 rounded-md mt-3 mb-3">
                    This is the franchisor account.
                  </p>
                )}
                {profile.role === 'admin' && (
                  <p className="[font-family:Poppins,sans-serif] text-center text-sm uppercase font-bold tracking-[-0.14px] text-[white] bg-[purple] whitespace-pre-wrap m-0 p-2 rounded-md mt-3 mb-3">
                    {`${profile.title} franchisee owner`}
                  </p>
                )}
                {profile.role === 'user' && (
                  <p className="[font-family:Poppins,sans-serif] text-center text-sm uppercase font-bold tracking-[-0.14px] text-[white] bg-[darkblue] whitespace-pre-wrap m-0 p-2 rounded-md mt-3 mb-3">
                    {`${profile.title} franchisee user`}
                  </p>
                )}
                {profile.role === 'admin' && (
                  <p className="[font-family:Poppins,sans-serif] text-sm font-medium tracking-[-0.14px] text-[#292d32] whitespace-pre-wrap m-0 p-0 mt-3">
                    {profile.address}
                  </p>
                )}
                <p className="[font-family:Poppins,sans-serif] text-sm font-medium tracking-[-0.14px] text-[#292d32] whitespace-pre-wrap m-0 p-0 mt-3">
                  <span className="[font-family:Poppins,sans-serif] text-sm font-medium text-[#7d7d7d] tracking-[-0.14px] text-left">
                    Email
                  </span>
                  <span>: {profile.email}</span>
                </p>
                <p className="[font-family:Poppins,sans-serif] text-sm font-medium tracking-[-0.14px] text-[#292d32] whitespace-pre-wrap m-0 p-0 mt-3">
                  <span className="[font-family:Poppins,sans-serif] text-sm font-medium text-[#7d7d7d] tracking-[-0.14px] text-left">
                    Phone
                  </span>
                  <span>: {profile.phone}</span>
                </p>
              </div>
              {profile.role === 'admin' && (
                <p className="[font-family:Poppins,sans-serif] text-sm font-medium tracking-[-0.14px] text-[#292d32] mt-3 m-0 p-0">
                  <span className="[font-family:Poppins,sans-serif] text-sm font-medium text-[#7d7d7d] tracking-[-0.14px] text-left">
                    Merchant ID
                  </span>
                  <span>: {profile.merchantId}</span>
                </p>
              )}
            </div>
          </div>
          <button
            className="rounded bg-[#1e3c55] w-[70%] mx-auto my-2 py-2 shadow-[0px_4px_4px_rgba(0,0,0,0.30)] [font-family:Montserrat,sans-serif] text-base font-semibold uppercase text-[white] cursor-pointer block box-border border-[none]"
            onClick={() => setProfileModalOn(true)}
          >
            EDIT PROFILE
          </button>
          <button
            className="rounded bg-[#1e3c55] w-[70%] mx-auto my-2 py-2 shadow-[0px_4px_4px_rgba(0,0,0,0.30)] [font-family:Montserrat,sans-serif] text-base font-semibold uppercase text-[white] cursor-pointer block box-border border-[none]"
            onClick={() => setPasswordModalOn(true)}
          >
            CHANGE PASSWORD
          </button>
          {profile.role === 'admin' && (
            <button
              className="rounded bg-[#1e3c55] w-[70%] mx-auto my-2 py-2 shadow-[0px_4px_4px_rgba(0,0,0,0.30)] [font-family:Montserrat,sans-serif] text-base font-semibold uppercase text-[white] cursor-pointer block box-border border-[none]"
              onClick={() => setAdminModalOn(true)}
            >
              ADD ADMIN
            </button>
          )}
          <button
            onClick={() => {
              handleLogout();
            }}
            className="rounded bg-[#EE0202] w-[70%] mx-auto my-2 py-2 shadow-[0px_4px_4px_rgba(0,0,0,0.30)] [font-family:Montserrat,sans-serif] text-base font-semibold uppercase text-[white] cursor-pointer block box-border border-[none]"
          >
            LOGOUT
          </button>

          <OverlayModal
            isOpen={profileModalOn}
            onClose={() => {
              setProfileModalOn(false);
            }}
            title="EDIT PROFILe"
          >
            <IconInput
              type="text"
              placeholder="FIRST NAME"
              icon={userIcon}
              name="firstName"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
            <IconInput
              type="text"
              placeholder="LAST NAME"
              icon={autographIcon}
              name="lastName"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
            />
            <IconInput
              type="text"
              placeholder="PHONE"
              icon={phoneIcon}
              name="phone"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
            />
            {profile.role === 'admin' && (
              <>
                <IconInput
                  type="text"
                  placeholder="MERCHANT ID"
                  icon={lockIcon}
                  name="mid"
                  value={newMID}
                  onChange={(e) => setNewMID(e.target.value)}
                />
                <IconInput
                  type="text"
                  placeholder="ADDRESS"
                  icon={emailIcon}
                  name="addr"
                  value={newAddr}
                  onChange={(e) => setNewAddr(e.target.value)}
                />
              </>
            )}
            <button
              disabled={
                newFirstName === '' ||
                newLastName === '' ||
                newPhone === '' ||
                (profile.role === 'admin' && (newMID === '' || newAddr === '')) ||
                updateLoading
              }
              onClick={() => sendUpdateRequest()}
              className="rounded bg-[#1e3c55] w-full my-2 py-3 shadow-[0px_4px_4px_rgba(0,0,0,0.30)] [font-family:Montserrat,sans-serif] text-base font-semibold uppercase text-[white] cursor-pointer block box-border border-[none]"
            >
              {updateLoading ? 'UPDATING...' : 'UPDATE'}
            </button>
          </OverlayModal>
          <OverlayModal
            isOpen={passwordModalOn}
            onClose={() => {
              setPasswordModalOn(false);
            }}
            title="CHANGE PASSWORD"
          >
            <IconInput
              type="password"
              placeholder="OLD PASSWORD"
              icon={autographIcon}
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <IconInput
              type="password"
              placeholder="NEW PASSWORD"
              icon={lockIcon}
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <IconInput
              type="password"
              placeholder="CONFIRM PASSWORD"
              icon={lockIcon}
              name="confPassword"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
            <button
              disabled={newPassword === '' || confPassword === '' || oldPassword === '' || changeLoading}
              onClick={() => {
                newPassword !== confPassword && Toaster.error(`Password confirmation doesn't match`);
                newPassword === confPassword && sendChangeRequest();
              }}
              className="rounded bg-[#1e3c55] w-full my-2 py-3 shadow-[0px_4px_4px_rgba(0,0,0,0.30)] [font-family:Montserrat,sans-serif] text-base font-semibold uppercase text-[white] cursor-pointer block box-border border-[none]"
            >
              {changeLoading ? 'CHANGING...' : 'CHANGE'}
            </button>
          </OverlayModal>
          <OverlayModal
            isOpen={adminModalOn}
            onClose={() => {
              setAdminModalOn(false);
            }}
            title="ADD ADMIN"
          >
            <IconInput
              type="email"
              placeholder="EMAIL ADDRESS"
              icon={emailIcon}
              name="adminemail"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
            <button
              disabled={adminEmail === '' || adminLoading}
              onClick={() => sendAdminRequest()}
              className="rounded bg-[#1e3c55] w-full my-2 py-3 shadow-[0px_4px_4px_rgba(0,0,0,0.30)] [font-family:Montserrat,sans-serif] text-base font-semibold uppercase text-[white] cursor-pointer block box-border border-[none]"
            >
              {adminLoading ? 'ADDING ADMIN...' : 'ADD ADMIN'}
            </button>
          </OverlayModal>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(Account);
