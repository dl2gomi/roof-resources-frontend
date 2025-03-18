'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import logo from '@/public/img/logo.png';
import menusvg from '@/public/img/menu.svg';
import closesvg from '@/public/img/close.svg';

const NavbarWithoutUser = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="h-[100px] flex w-full items-center ">
      <div className="flex justify-between w-full items-center">
        <div className="px-8 h-[60px]">
          <Link href="/">
            <Image src={logo} alt="roof resource logo" className="object-cover" height={60} />
          </Link>
        </div>

        <div className="hidden md:flex space-x-4">
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
          <Link href="/branches">
            <div className="[font-family:'Open_Sans',sans-serif] text-sm font-bold tracking-[0.75px] leading-4 uppercase text-[#1e3c55] m-0 p-0">
              Branches
            </div>
          </Link>
          <Link href="/users">
            <div className="[font-family:'Open_Sans',sans-serif] text-sm font-bold tracking-[0.75px] leading-4 uppercase text-[#1e3c55] m-0 p-0">
              Users
            </div>
          </Link>
        </div>

        <div className="hidden md:flex space-x-4 w-[84px]">{''}</div>

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
              <Link href="/branches">
                <div className="[font-family:'Open_Sans',sans-serif] text-lg font-bold tracking-[0.75px] leading-4 uppercase text-[#1e3c55] my-6">
                  Branches
                </div>
              </Link>
              <Link href="/users">
                <div className="[font-family:'Open_Sans',sans-serif] text-lg font-bold tracking-[0.75px] leading-4 uppercase text-[#1e3c55] my-6">
                  Users
                </div>
              </Link>
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

export default NavbarWithoutUser;
