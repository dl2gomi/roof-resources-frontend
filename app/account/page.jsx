import { SuperAdminLayout } from '@/layouts';
import Image from 'next/image';
import { IconInput } from '@/components/widgets';

import emailIcon from '@/public/icons/icon-email.png';
import userIcon from '@/public/icons/icon-user.png';
import autographIcon from '@/public/icons/icon-autograph.png';
import phoneIcon from '@/public/icons/icon-phone.png';
import lockIcon from '@/public/icons/icon-lock.png';
import cameraIcon from '@/public/icons/icon-camera.png';
import avatar from '@/public/img/avatar-default.png';

import '@/styles/all.css';

export default function Account() {
  return (
    <SuperAdminLayout background="account-info">
      <div className="grid grid-cols-12 justify-center items-center basis-auto w-full">
        <div className="xl:col-start-5 xl:col-span-4 lg:col-start-5 lg:col-span-4 md:col-start-4 md:col-span-6 sm:col-start-3 sm:col-span-8 col-start-2 col-span-10 justify-center">
          <div className="flex justify-center">
            <Image src={avatar} className="object-cover box-border border-[none]" alt="avatar" height={160} />
          </div>
          <div className="flex justify-start items-center flex-col grow-0 shrink-0 basis-auto my-[31px]">
            <p className="[font-family:Inter,sans-serif] text-2xl font-semibold text-[#242760] m-0 p-0">
              Melissa peters
            </p>
            <div className="mt-[19px]">
              <div className="w-full box-border">
                <p className="[font-family:Poppins,sans-serif] text-sm font-medium tracking-[-0.14px] text-[#292d32] whitespace-pre-wrap m-0 p-0 mt-3">
                  132 My Street, Kingston, New York 12401
                </p>
                <p className="[font-family:Poppins,sans-serif] text-sm font-medium tracking-[-0.14px] text-[#292d32] whitespace-pre-wrap m-0 p-0 mt-3">
                  <span className="[font-family:Poppins,sans-serif] text-sm font-medium text-[#7d7d7d] tracking-[-0.14px] text-left">
                    Email:
                  </span>
                  <span> melisa@roof.com</span>
                </p>
                <p className="[font-family:Poppins,sans-serif] text-sm font-medium tracking-[-0.14px] text-[#292d32] whitespace-pre-wrap m-0 p-0 mt-3">
                  <span className="[font-family:Poppins,sans-serif] text-sm font-medium text-[#7d7d7d] tracking-[-0.14px] text-left">
                    Phone:
                  </span>
                  <span> +12223334444</span>
                </p>
              </div>
              <p className="[font-family:Poppins,sans-serif] text-sm font-medium tracking-[-0.14px] text-[#292d32] mt-3 m-0 p-0">
                <span className="[font-family:Poppins,sans-serif] text-sm font-medium text-[#7d7d7d] tracking-[-0.14px] text-left">
                  Merchant ID
                </span>
                <span>: 08c328ee-d273-41c6-8331-8519126fa04e</span>
              </p>
            </div>
          </div>
          <button className="rounded bg-[#1e3c55] w-[70%] mx-auto my-2 py-2 shadow-[0px_4px_4px_rgba(0,0,0,0.30)] [font-family:Montserrat,sans-serif] text-base font-semibold uppercase text-[white] cursor-pointer block box-border border-[none]">
            EDIT PROFILE
          </button>
          <button className="rounded bg-[#1e3c55] w-[70%] mx-auto my-2 py-2 shadow-[0px_4px_4px_rgba(0,0,0,0.30)] [font-family:Montserrat,sans-serif] text-base font-semibold uppercase text-[white] cursor-pointer block box-border border-[none]">
            ADD ADMIN
          </button>
          <button className="rounded bg-[#EE0202] w-[70%] mx-auto my-2 py-2 shadow-[0px_4px_4px_rgba(0,0,0,0.30)] [font-family:Montserrat,sans-serif] text-base font-semibold uppercase text-[white] cursor-pointer block box-border border-[none]">
            LOGOUT
          </button>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
