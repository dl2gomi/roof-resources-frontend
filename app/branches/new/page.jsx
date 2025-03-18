import { SuperAdminLayout } from '@/layouts';
import Image from 'next/image';
import { IconInput } from '@/components/widgets';

import emailIcon from '@/public/icons/icon-email.png';
import userIcon from '@/public/icons/icon-user.png';
import autographIcon from '@/public/icons/icon-autograph.png';
import phoneIcon from '@/public/icons/icon-phone.png';
import lockIcon from '@/public/icons/icon-lock.png';
import cameraIcon from '@/public/icons/icon-camera.png';
import logo from '@/public/img/logo.png';

import '@/styles/all.css';

export default function BranchCreate() {
  return (
    <SuperAdminLayout background="create-branch">
      <div className="grid grid-cols-12 lg:grid-cols-11 xl:grid-cols-12 justify-center items-center basis-auto w-full">
        <div className="xl:col-start-6 xl:col-span-2 lg:col-start-5 lg:col-span-3 md:col-start-5 md:col-span-4 sm:col-start-4 sm:col-span-6 col-start-3 col-span-8">
          <Image src={logo} className="object-cover box-border border-[none]" alt="roof resource logo" />
          <IconInput type="email" placeholder="EMAIL" icon={emailIcon} name="email" />
          <IconInput type="text" placeholder="FIRST NAME" icon={userIcon} name="firstName" />
          <IconInput type="text" placeholder="LAST NAME" icon={autographIcon} name="lastName" />
          <IconInput type="text" placeholder="PHONE" icon={phoneIcon} name="phone" />
          <IconInput type="password" placeholder="PASSWORD" icon={lockIcon} name="password" />
          <button className="rounded bg-[#F1B533] w-full my-1 py-3 shadow-[0px_4px_4px_rgba(0,0,0,0.30)] [font-family:Montserrat,sans-serif] text-base font-light uppercase text-[white] cursor-pointer block box-border border-[none]">
            <div className="flex justify-center">
              <Image
                src={cameraIcon}
                alt={`camera icon`}
                height={20}
                objectFit="contain"
                style={{ objectFit: 'contain' }}
              />
              <span className="text-[#1e3c55] ms-2">PHOTO</span>
            </div>
          </button>
          <button className="rounded bg-[#1e3c55] w-full my-2 py-3 shadow-[0px_4px_4px_rgba(0,0,0,0.30)] [font-family:Montserrat,sans-serif] text-base font-semibold uppercase text-[white] cursor-pointer block box-border border-[none]">
            CREATE BRANCH
          </button>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
