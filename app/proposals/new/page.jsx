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

export default function ProposalCreate() {
  return (
    <SuperAdminLayout background="create-proposal">
      <div className="grid grid-cols-12 lg:grid-cols-11 xl:grid-cols-12 justify-center items-center basis-auto w-full">
        <div className="xl:col-start-4 xl:col-span-6 md:col-start-3 md:col-span-8 col-start-2 col-span-10">
          <div className="flex justify-center items-center">
            <div className="bg-transparent p-6 col-start-0 w-full">
              <div className="text-[#1E3C55] font-bold uppercase mb-8 text-center md:text-start">
                Create a new proposal
              </div>
              {/* Customer Full Name */}
              <div className="flex flex-col gap-2 mb-4">
                <p className="text-xs font-semibold text-[#666666] m-0">Customer Full Name</p>
                <div className="border border-[#cccccc] rounded-lg p-4 bg-transparent">
                  <input
                    placeholder="Enter name"
                    type="text"
                    className="h-6 w-full text-base text-[#666666] border-0 outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Customer Full Address */}
              <div className="flex flex-col gap-2 mb-4">
                <p className="text-xs font-semibold text-[#666666] m-0">Customer Full Address</p>
                <div className="border border-[#cccccc] rounded-lg p-4 bg-transparent">
                  <input
                    placeholder="Enter Address"
                    type="text"
                    className="h-6 w-full text-base text-[#666666] border-0 outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Breakdown */}
              <p className="text-xs font-semibold text-[#666666] mb-4">Breakdown</p>
              <div className="flex flex-col gap-4 mb-4 bg-transparent">
                <input
                  placeholder="Step 1"
                  type="text"
                  className="rounded bg-slate-50 h-12 w-full p-2 font-[IBM_Plex_Sans] text-base font-bold tracking-[0.16px] border-0 text-[#b8bcca] focus:outline-none"
                />
                <input
                  placeholder="Step 2"
                  type="text"
                  className="rounded bg-slate-50 h-12 w-full p-2 font-[IBM_Plex_Sans] text-base font-bold tracking-[0.16px] border-0 text-[#b8bcca] focus:outline-none"
                />
                <input
                  placeholder="Step 3"
                  type="text"
                  className="rounded bg-slate-50 h-12 w-full p-2 font-[IBM_Plex_Sans] text-base font-bold tracking-[0.16px] border-0 text-[#b8bcca] focus:outline-none"
                />
                <input
                  placeholder="Step 4"
                  type="text"
                  className="rounded bg-slate-50 h-12 w-full p-2 font-[IBM_Plex_Sans] text-base font-bold tracking-[0.16px] border-0 text-[#b8bcca] focus:outline-none"
                />
              </div>

              {/* Options */}
              <div className="grid items-start grid-cols-12 mb-6">
                <div className="md:col-span-5 col-span-12">
                  <p className="text-xs font-semibold text-[#666666] mb-2 p-2 overflow-hidden text-ellipsis whitespace-nowrap">
                    MEASUREMENT / SQUARE COUNT
                  </p>
                  <div className="bg-slate-50 flex flex-col items-end gap-1 p-2 rounded-xl mb-4 ">
                    <div className="text-base md:text-end font-bold tracking-[0.16px] text-[#b8bcca] m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      House
                    </div>
                    <div className="text-base md:text-end font-bold tracking-[0.16px] text-[#b8bcca] m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      Garage
                    </div>
                    <div className="text-base md:text-end font-bold tracking-[0.16px] text-[#b8bcca] m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      Shed
                    </div>
                    <div className="text-base md:text-end font-bold tracking-[0.16px] text-[#b8bcca] m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      Flat Roof
                    </div>
                    <div className="text-base md:text-end font-bold tracking-[0.16px] text-[#b8bcca] m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      Percent of Waste
                    </div>
                    <div className="text-base md:text-end font-bold tracking-[0.16px] text-[#b8bcca] m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      Measurement in Squares
                    </div>
                    <div className="text-base md:text-end font-bold tracking-[0.16px] text-[#b8bcca] m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      Total Squares
                    </div>
                    <div className="text-base md:text-end font-bold tracking-[0.16px] text-[#b8bcca] m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      Skylight
                    </div>
                  </div>
                </div>
                <div className="md:col-span-7 col-span-12">
                  <p className="text-xs font-semibold text-[#666666] mb-2 p-2">Day of Installation</p>
                  <div className=" backdrop-blur shadow-[0px_32px_32px_rgba(0,0,0,0.10)] bg-[rgba(255,255,255,0.70)] flex flex-col items-center p-2 rounded-xl">
                    {/* Checkbox 1 */}
                    <div className="flex flex-row gap-2 items-center w-full p-2 rounded-lg">
                      <div className="h-5 w-5 border rounded-[3px] border-gray-400 relative">
                        <input type="checkbox" className="absolute inset-0 opacity-0 cursor-pointer peer" />
                        <img
                          className="w-5 h-5 hidden -ml-px -mt-px peer-checked:block"
                          alt="Checkbox Icon"
                          src="https://dummyimage.com/40x40/038908/ffffff&text=%E2%9C%93"
                        />
                      </div>
                      <p className="text-xs text-[#616161] font-normal font-[Jost]">Complete Deluxe Tear-Off</p>
                    </div>
                    <div className="flex flex-row gap-2 items-center w-full p-2 rounded-lg">
                      <div className="h-5 w-5 border rounded-[3px] border-gray-400 relative">
                        <input type="checkbox" className="absolute inset-0 opacity-0 cursor-pointer peer" />
                        <img
                          className="w-5 h-5 hidden -ml-px -mt-px peer-checked:block"
                          alt="Checkbox Icon"
                          src="https://dummyimage.com/40x40/038908/ffffff&text=%E2%9C%93"
                        />
                      </div>
                      <p className="text-xs text-[#616161] font-normal font-[Jost]">
                        Roof Deck Inspection & Installation
                      </p>
                    </div>
                    <div className="flex flex-row gap-2 items-center w-full p-2 rounded-lg">
                      <div className="h-5 w-5 border rounded-[3px] border-gray-400 relative">
                        <input type="checkbox" className="absolute inset-0 opacity-0 cursor-pointer peer" />
                        <img
                          className="w-5 h-5 hidden -ml-px -mt-px peer-checked:block"
                          alt="Checkbox Icon"
                          src="https://dummyimage.com/40x40/038908/ffffff&text=%E2%9C%93"
                        />
                      </div>
                      <p className="text-xs text-[#616161] font-normal font-[Jost]">
                        Continuous Ridge Ventilation System
                      </p>
                    </div>
                    <div className="flex flex-row gap-2 items-center w-full p-2 rounded-lg">
                      <div className="h-5 w-5 border rounded-[3px] border-gray-400 relative">
                        <input type="checkbox" className="absolute inset-0 opacity-0 cursor-pointer peer" />
                        <img
                          className="w-5 h-5 hidden -ml-px -mt-px peer-checked:block"
                          alt="Checkbox Icon"
                          src="https://dummyimage.com/40x40/038908/ffffff&text=%E2%9C%93"
                        />
                      </div>
                      <p className="text-xs text-[#616161] font-normal font-[Jost]">Install the Following</p>
                    </div>
                    <div className="flex flex-row gap-2 items-center w-full p-2 rounded-lg">
                      <div className="h-5 w-5 border rounded-[3px] border-gray-400 relative">
                        <input type="checkbox" className="absolute inset-0 opacity-0 cursor-pointer peer" />
                        <img
                          className="w-5 h-5 hidden -ml-px -mt-px peer-checked:block"
                          alt="Checkbox Icon"
                          src="https://dummyimage.com/40x40/038908/ffffff&text=%E2%9C%93"
                        />
                      </div>
                      <p className="text-xs text-[#616161] font-normal font-[Jost]">Estimate</p>
                    </div>
                    <div className="flex flex-row gap-2 items-center w-full p-2 rounded-lg">
                      <div className="h-5 w-5 border rounded-[3px] border-gray-400 relative">
                        <input type="checkbox" className="absolute inset-0 opacity-0 cursor-pointer peer" />
                        <img
                          className="w-5 h-5 hidden -ml-px -mt-px peer-checked:block"
                          alt="Checkbox Icon"
                          src="https://dummyimage.com/40x40/038908/ffffff&text=%E2%9C%93"
                        />
                      </div>
                      <p className="text-xs text-[#616161] font-normal font-[Jost]">Exhaust Ventilation (Can Vents)</p>
                    </div>
                    {/* Additional checkboxes can be added similarly */}
                  </div>
                </div>
              </div>

              {/* Checkboxes */}

              {/* Buttons */}
              <div className="flex flex-row items-start justify-between mb-4">
                <button className="rounded bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.30)] font-[Montserrat] text-base font-semibold uppercase text-[#1e3c55] w-60 h-[45px] border-0">
                  Cancel
                </button>
                <div className="rounded h-[45px] w-60" />
                <button className="rounded bg-[#1e3c55] shadow-[0px_4px_4px_rgba(0,0,0,0.30)] font-[Montserrat] text-base font-semibold uppercase text-white w-60 h-[45px] border-0">
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
