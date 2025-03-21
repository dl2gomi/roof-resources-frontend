'use client';

import { AdminLayout } from '@/layouts';
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
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store';
import { proposalCreateUrl, proposalUpdateUrl } from '@/consts';
import { useRouter } from 'next/navigation';
import { useApiRequest } from '@/hooks';
import { openMailWindow, Toaster, withAuth } from '@/helpers';

const ProposalCreate = () => {
  const userState = useAppSelector((state) => state.user);
  const router = useRouter();

  const [id, setId] = useState();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const [averageRetail, setAverageRetail] = useState(0);
  const [materials, setMaterials] = useState(0);
  const [dumpster, setDumpster] = useState(0);
  const [laborPermit, setLaborPermit] = useState(0);

  const [house, setHouse] = useState(0);
  const [garage, setGarage] = useState(-1);
  const [shed, setShed] = useState(-1);
  const [flatroof, setFlatroof] = useState(-1);
  const [skylight, setSkylight] = useState(-1);
  const [squares, setSquares] = useState(0);
  const [percentWaste, setPercentWaste] = useState(0);
  const [totalSquares, setTotalSquares] = useState(0);

  const [deluxe, setDeluxe] = useState(false);
  const [roofdeck, setRoofDeck] = useState(false);
  const [ridgeVent, setRidgeVent] = useState(false);
  const [installFollow, setInstallFollow] = useState(false);
  const [estimate, setEstimate] = useState(false);
  const [exhaustVent, setExhaustVent] = useState(false);

  const {
    response: createResponse,
    error: createError,
    loading: createLoading,
    sendRequest: sendCreateRequest,
  } = useApiRequest({
    endpoint: proposalCreateUrl,
    method: 'POST',
    headers: {
      authorization: `Bearer ${userState.token}`,
    },
    data: {
      customer: {
        name,
        address,
      },
      pricing: {
        averageRetail,
        materials,
        dumpster,
        laborPermit,
      },
      detail: {
        house,
        percentWaste,
        squares,
        garage: parseInt(garage) === -1 ? null : parseInt(garage) === 0 ? false : true,
        shed: parseInt(shed) === -1 ? null : parseInt(shed) === 0 ? false : true,
        flatroof: parseInt(flatroof) === -1 ? null : parseInt(flatroof) === 0 ? false : true,
        skylight: parseInt(skylight) === -1 ? null : parseInt(skylight) === 0 ? false : true,
      },
      options: {
        deluxeTearOff: deluxe === 'on',
        roofDeck: roofdeck === 'on',
        ridgeVent: ridgeVent === 'on',
        installFollow: installFollow === 'on',
        estimate: estimate === 'on',
        exhaustVent: exhaustVent === 'on',
      },
    },
  });

  const {
    response: updateResponse,
    error: updateError,
    loading: updateLoading,
    sendRequest: sendUpdateRequest,
  } = useApiRequest({
    endpoint: proposalUpdateUrl,
    method: 'PUT',
    headers: {
      authorization: `Bearer ${userState.token}`,
    },
  });

  const handleSend = () => {
    if (!id) sendCreateRequest();
    else sendUpdateRequest({ isSent: true }, {}, `/${id}`);
  };

  useEffect(() => {
    setTotalSquares((squares * (1 + percentWaste / 100)).toFixed(2));
  }, [squares, percentWaste]);

  useEffect(() => {
    createResponse && createResponse.data.id && setId(createResponse.data.id);
    createResponse && createResponse.data.mailBody && openMailWindow(createResponse.data.mailBody);
    createResponse && Toaster.success(createResponse.message);
  }, [createResponse]);

  useEffect(() => {
    createError && Toaster.error(createError.message);
  }, [createError]);

  useEffect(() => {
    updateResponse && Toaster.success(updateResponse.message);
    updateResponse && router.push('/proposals');
  }, [updateResponse]);

  useEffect(() => {
    updateError && Toaster.error(updateError.message);
  }, [updateError]);

  return (
    <AdminLayout background="create-proposal">
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
                <div className="border border-[#cccccc] rounded-sm p-4 bg-transparent">
                  <input
                    placeholder="Enter name"
                    type="text"
                    className="h-6 w-full text-base text-[#666666] border-0 outline-none bg-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              {/* Customer Full Address */}
              <div className="flex flex-col gap-2 mb-4">
                <p className="text-xs font-semibold text-[#666666] m-0">Customer Full Address</p>
                <div className="border border-[#cccccc] rounded-sm p-4 bg-transparent">
                  <input
                    placeholder="Enter Address"
                    type="text"
                    className="h-6 w-full text-base text-[#666666] border-0 outline-none bg-white"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              {/* Breakdown */}
              <div className="flex flex-col gap-2 mb-4 bg-transparent">
                <p className="text-xs font-semibold text-[#666666]">Average Retail Price</p>
                <input
                  placeholder="Average Retail Price"
                  type="number"
                  className="rounded bg-white text-end h-12 w-full px-2 text-base tracking-[0.16px] border-1 text-[#666666] focus:outline-none"
                  value={averageRetail}
                  onChange={(e) => setAverageRetail(e.target.value)}
                />
                <p className="text-xs font-semibold text-[#666666]">Materials</p>
                <input
                  placeholder="Materials"
                  type="number"
                  className="rounded bg-white text-end h-12 w-full p-2  text-base tracking-[0.16px] border-1 text-[#666666] focus:outline-none"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                />
                <p className="text-xs font-semibold text-[#666666]">Dumpster</p>
                <input
                  placeholder="Dumpster"
                  type="number"
                  className="rounded bg-white text-end h-12 w-full p-2 text-base tracking-[0.16px] border-1 text-[#666666] focus:outline-none"
                  value={dumpster}
                  onChange={(e) => setDumpster(e.target.value)}
                />
                <p className="text-xs font-semibold text-[#666666]">Labor / Permit</p>
                <input
                  placeholder="Labor / Permit"
                  type="number"
                  className="rounded bg-white text-end h-12 w-full p-2 text-base tracking-[0.16px] border-1 text-[#666666] focus:outline-none"
                  value={laborPermit}
                  onChange={(e) => setLaborPermit(e.target.value)}
                />
              </div>

              {/* Options */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-[#666666] mb-2 p-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  MEASUREMENT / SQUARE COUNT
                </p>
                <div className="bg-slate-100 grid grid-cols-1 md:grid-cols-2 gap-2 p-4 rounded-xl mb-4 ">
                  <div className="flex flex-row items-center justify-between ">
                    <div className="text-base font-bold tracking-[0.16px] text-[#b8bcca] m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      House
                    </div>
                    <input
                      type="number"
                      className="rounded bg-white text-end h-8 w-full p-2 text-base tracking-[0.16px text-[#666666] focus:outline-none"
                      value={house}
                      onChange={(e) => setHouse(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-base font-bold tracking-[0.16px] text-[#b8bcca] m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      Percent of Waste
                    </div>
                    <input
                      type="number"
                      className="rounded bg-white text-end h-8 w-full p-2 text-base tracking-[0.16px text-[#666666] focus:outline-none"
                      value={percentWaste}
                      onChange={(e) => setPercentWaste(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-base font-bold tracking-[0.16px] text-[#b8bcca] m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      Measurement Squares
                    </div>
                    <input
                      type="number"
                      className="rounded bg-white text-end h-8 w-full p-2 text-base tracking-[0.16px text-[#666666] focus:outline-none"
                      value={squares}
                      onChange={(e) => setSquares(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-base font-bold tracking-[0.16px] text-[#b8bcca] m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      Total Squares
                    </div>
                    <input
                      type="number"
                      className="rounded  disabled bg-white text-end h-8 w-full p-2 text-base tracking-[0.16px text-[#666666] focus:outline-none"
                      value={totalSquares}
                      readOnly
                    />
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-base font-bold tracking-[0.16px] text-[#b8bcca] m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      Garage
                    </div>
                    <select
                      className="rounded bg-white text-end h-8 w-full p-2 text-base tracking-[0.16px] text-[#666666] focus:outline-none"
                      value={garage}
                      onChange={(e) => setGarage(e.target.value)}
                    >
                      <option value={1}>Yes</option>
                      <option value={0}>No</option>
                      <option value={-1}>N/A</option>
                    </select>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-base font-bold tracking-[0.16px] text-[#b8bcca] m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      Shed
                    </div>
                    <select
                      className="rounded bg-white text-end h-8 w-full p-2 text-base tracking-[0.16px] text-[#666666] focus:outline-none"
                      value={shed}
                      onChange={(e) => setShed(e.target.value)}
                    >
                      <option value={1}>Yes</option>
                      <option value={0}>No</option>
                      <option value={-1}>N/A</option>
                    </select>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-base font-bold tracking-[0.16px] text-[#b8bcca] m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      Flat Roof
                    </div>
                    <select
                      className="rounded bg-white text-end h-8 w-full p-2 text-base tracking-[0.16px] text-[#666666] focus:outline-none"
                      value={flatroof}
                      onChange={(e) => setFlatroof(e.target.value)}
                    >
                      <option value={1}>Yes</option>
                      <option value={0}>No</option>
                      <option value={-1}>N/A</option>
                    </select>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-base font-bold tracking-[0.16px] text-[#b8bcca] m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      Skylight
                    </div>
                    <select
                      className="rounded bg-white text-end h-8 w-full p-2 text-base tracking-[0.16px] text-[#666666] focus:outline-none"
                      value={skylight}
                      onChange={(e) => setSkylight(e.target.value)}
                    >
                      <option value={1}>Yes</option>
                      <option value={0}>No</option>
                      <option value={-1}>N/A</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-xs font-semibold text-[#666666] mb-2 p-2">Day of Installation</p>
                <div className=" backdrop-blur shadow-[0px_32px_32px_rgba(0,0,0,0.10)] bg-[rgba(255,255,255,0.70)] flex flex-col items-center p-2 rounded-xl">
                  {/* Checkbox 1 */}
                  <div className="flex flex-row gap-2 items-center w-full p-2 rounded-lg">
                    <div className="h-5 w-5 border rounded-[3px] border-gray-400 relative">
                      <input
                        type="checkbox"
                        className="absolute inset-0 opacity-0 cursor-pointer peer"
                        checked={deluxe}
                        onChange={(e) => setDeluxe(e.target.value)}
                      />
                      <img
                        className="w-5 h-5 hidden peer-checked:block "
                        alt="Checkbox Icon"
                        src="https://dummyimage.com/40x40/038908/ffffff&text=%E2%9C%93"
                      />
                    </div>
                    <p className="text-sm text-[#616161] font-normal">Complete Deluxe Tear-Off</p>
                  </div>
                  <div className="flex flex-row gap-2 items-center w-full p-2 rounded-lg">
                    <div className="h-5 w-5 border rounded-[3px] border-gray-400 relative">
                      <input
                        type="checkbox"
                        className="absolute inset-0 opacity-0 cursor-pointer peer"
                        checked={roofdeck}
                        onChange={(e) => setRoofDeck(e.target.value)}
                      />
                      <img
                        className="w-5 h-5 hidden peer-checked:block"
                        alt="Checkbox Icon"
                        src="https://dummyimage.com/40x40/038908/ffffff&text=%E2%9C%93"
                      />
                    </div>
                    <p className="text-sm text-[#616161] font-normal">Roof Deck Inspection & Installation</p>
                  </div>
                  <div className="flex flex-row gap-2 items-center w-full p-2 rounded-lg">
                    <div className="h-5 w-5 border rounded-[3px] border-gray-400 relative">
                      <input
                        type="checkbox"
                        className="absolute inset-0 opacity-0 cursor-pointer peer"
                        checked={ridgeVent}
                        onChange={(e) => setRidgeVent(e.target.value)}
                      />
                      <img
                        className="w-5 h-5 hidden peer-checked:block"
                        alt="Checkbox Icon"
                        src="https://dummyimage.com/40x40/038908/ffffff&text=%E2%9C%93"
                      />
                    </div>
                    <p className="text-sm text-[#616161] font-normal">Continuous Ridge Ventilation System</p>
                  </div>
                  <div className="flex flex-row gap-2 items-center w-full p-2 rounded-lg">
                    <div className="h-5 w-5 border rounded-[3px] border-gray-400 relative">
                      <input
                        type="checkbox"
                        className="absolute inset-0 opacity-0 cursor-pointer peer"
                        checked={installFollow}
                        onChange={(e) => setInstallFollow(e.target.value)}
                      />
                      <img
                        className="w-5 h-5 hidden peer-checked:block"
                        alt="Checkbox Icon"
                        src="https://dummyimage.com/40x40/038908/ffffff&text=%E2%9C%93"
                      />
                    </div>
                    <p className="text-sm text-[#616161] font-normal">Install the Following</p>
                  </div>
                  <div className="flex flex-row gap-2 items-center w-full p-2 rounded-lg">
                    <div className="h-5 w-5 border rounded-[3px] border-gray-400 relative">
                      <input
                        type="checkbox"
                        className="absolute inset-0 opacity-0 cursor-pointer peer"
                        checked={estimate}
                        onChange={(e) => setEstimate(e.target.value)}
                      />
                      <img
                        className="w-5 h-5 hidden peer-checked:block"
                        alt="Checkbox Icon"
                        src="https://dummyimage.com/40x40/038908/ffffff&text=%E2%9C%93"
                      />
                    </div>
                    <p className="text-sm text-[#616161] font-normal">Estimate</p>
                  </div>
                  <div className="flex flex-row gap-2 items-center w-full p-2 rounded-lg">
                    <div className="h-5 w-5 border rounded-[3px] border-gray-400 relative">
                      <input
                        type="checkbox"
                        className="absolute inset-0 opacity-0 cursor-pointer peer"
                        checked={exhaustVent}
                        onChange={(e) => setExhaustVent(e.target.value)}
                      />
                      <img
                        className="w-5 h-5 hidden peer-checked:block"
                        alt="Checkbox Icon"
                        src="https://dummyimage.com/40x40/038908/ffffff&text=%E2%9C%93"
                      />
                    </div>
                    <p className="text-sm text-[#616161] font-normal">Exhaust Ventilation (Can Vents)</p>
                  </div>
                  {/* Additional checkboxes can be added similarly */}
                </div>
              </div>

              {/* Checkboxes */}

              {/* Buttons */}
              <div className="flex flex-row items-start justify-between mb-4">
                <button
                  className="rounded bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.30)] text-base font-semibold uppercase text-[#1e3c55] w-60 h-[45px] border-0 cursor-pointer"
                  onClick={() => router.push('/proposals')}
                >
                  Cancel
                </button>
                <div className="rounded h-[45px] w-60" />
                <button
                  className="rounded bg-[#1e3c55] shadow-[0px_4px_4px_rgba(0,0,0,0.30)] text-base font-semibold uppercase text-white w-60 h-[45px] border-0 cursor-pointer"
                  onClick={() => handleSend()}
                  disabled={!name || !address || createLoading}
                >
                  {!id && createLoading && 'Sending...'}
                  {!id && !createLoading && 'Send'}
                  {id && updateLoading && 'Confirming...'}
                  {id && !updateLoading && 'Confirm Send'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(ProposalCreate);
