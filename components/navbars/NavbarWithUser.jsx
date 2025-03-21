'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store';

import logo from '@/public/img/logo.png';
import menusvg from '@/public/img/menu.svg';
import closesvg from '@/public/img/close.svg';
import avatarDefault from '@/public/img/avatar-default.png';
import { useApiRequest } from '@/hooks';
import { avatarUrl } from '@/consts';

const NavbarWithUser = () => {
  const userState = useAppSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState(avatarDefault);

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
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

  return (
    <nav className="h-[100px] flex w-full items-center ">
      <div className="flex justify-between w-full items-center">
        <div className="px-8 h-[60px]">
          <Link href="/">
            <Image src={logo} alt="roof resource logo" className="object-cover" height={60} />
          </Link>
        </div>

        <div className="hidden md:flex space-x-4">
          {userState && userState.role === 'super' && (
            <Link href="/branches">
              <div className="[font-family:'Open_Sans',sans-serif] text-sm font-bold tracking-[0.75px] leading-4 uppercase text-[#1e3c55] m-0 p-0">
                Branches
              </div>
            </Link>
          )}
          <Link href="/proposals">
            <div className="[font-family:'Open_Sans',sans-serif] text-sm font-bold tracking-[0.75px] leading-4 uppercase text-[#1e3c55] m-0 p-0">
              Proposals
            </div>
          </Link>
          <Link href="/invoices">
            <div className="[font-family:'Open_Sans',sans-serif] text-sm font-bold tracking-[0.75px] leading-4 uppercase text-[#1e3c55] m-0 p-0">
              Invoices
            </div>
          </Link>
          {userState && (userState.role === 'super' || userState.role === 'admin') && (
            <Link href="/users">
              <div className="[font-family:'Open_Sans',sans-serif] text-sm font-bold tracking-[0.75px] leading-4 uppercase text-[#1e3c55] m-0 p-0">
                Users
              </div>
            </Link>
          )}
        </div>

        <Link
          className="hidden md:flex space-x-4 mx-4 border-[#242760] border-[2px] border-solid"
          style={{ borderRadius: '50%', width: '48px', height: '48px' }}
          href="/account"
        >
          <Image
            className="relative"
            src={avatar}
            alt="Profile avatar"
            style={{ borderRadius: '50%', width: '100%', height: '100%' }}
          />
        </Link>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none pe-8">
          <Image src={menusvg} alt="mobile menu" height={60} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full h-screen inset-0 bg-white">
          <div className="absolute flex justify-end top-3 right-3" onClick={toggleMenu}>
            <Image src={closesvg} alt="close button" height={50} />
          </div>
          <div className="flex justify-center items-center h-screen inset-0">
            <div>
              <Link href="/">
                <div className="[font-family:'Open_Sans',sans-serif] text-lg font-bold tracking-[0.75px] leading-4 uppercase text-[#1e3c55] my-6">
                  Home
                </div>
              </Link>
              {userState && userState.role === 'super' && (
                <Link href="/branches">
                  <div className="[font-family:'Open_Sans',sans-serif] text-lg font-bold tracking-[0.75px] leading-4 uppercase text-[#1e3c55] my-6">
                    Branches
                  </div>
                </Link>
              )}
              <Link href="/proposals">
                <div className="[font-family:'Open_Sans',sans-serif] text-lg font-bold tracking-[0.75px] leading-4 uppercase text-[#1e3c55] my-6">
                  Proposals
                </div>
              </Link>
              <Link href="/invoices">
                <div className="[font-family:'Open_Sans',sans-serif] text-lg font-bold tracking-[0.75px] leading-4 uppercase text-[#1e3c55] my-6">
                  Invoices
                </div>
              </Link>
              {userState && (userState.role === 'super' || userState.role === 'admin') && (
                <Link href="/users">
                  <div className="[font-family:'Open_Sans',sans-serif] text-lg font-bold tracking-[0.75px] leading-4 uppercase text-[#1e3c55] my-6">
                    Users
                  </div>
                </Link>
              )}
              <Link href="/account">
                <div className="[font-family:'Open_Sans',sans-serif] text-lg font-bold tracking-[0.75px] leading-4 uppercase text-[#1e3c55] my-6">
                  Account
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarWithUser;
