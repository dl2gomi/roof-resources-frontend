'use client';

import { useEffect } from 'react';
import { IconInput, Pagination } from '../widgets';

import searchIcon from '@/public/icons/icon-search.png';
import plusIcon from '@/public/icons/icon-plus.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function CustomTable({
  name,
  data,
  col1Name,
  col1,
  col2Name,
  col2,
  col3Name,
  col3,
  sorts,
  addButton = false,
  addUrl = undefined,
}) {
  const router = useRouter();

  useEffect(() => {
    data && console.log(data);
  }, [data]);

  return (
    <>
      <div className="mx-8 grid grid-cols-24 text-black items-center py-8 gap-2">
        <div className="col-span-24 md:col-span-13 uppercase text-lg text-center md:text-start py-2 font-bold text-[#1E3C55]">
          <div className="flex justify-between items-center">
            <span>{name}</span>
            <div>
              {addButton && addUrl && (
                <button className="bg-[#1E3C55] p-[9px] rounded cursor-pointer" onClick={() => router.push(addUrl)}>
                  <Image src={plusIcon} alt="Plus Icon" height={25} />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-24 md:col-span-6 uppercase text-xs md:pt-1 pb-1">
          <IconInput
            icon={searchIcon}
            placeholder="Search"
            type="text"
            name="search"
            bordered={false}
            background="#F9FBFF"
          />
        </div>
        <div className="col-span-24 md:col-span-5 text-xs md:text-end md:pt-1 pb-1">
          <div
            className={`rounded box-border flex justify-start items-center flex-row w-full h-[45px] px-4`}
            style={{ backgroundColor: '#F9FBFF' }}
          >
            <span className="text-[#7E7E7E]">Sort by:</span>
            <select className="text-gray-800 rounded-lg border-0 p-2 focus:outline-none focus:ring-0 focus:border-transparent">
              <option value="new">Newest</option>
              {sorts &&
                sorts.length &&
                sorts.map((ele, index) => (
                  <option value={ele} key={index}>
                    {ele}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div className="border-b border-[#EEEEEE]">
        <div className="mx-8 grid grid-cols-12 text-[#B5B7C0] py-2 font-bold">
          <div className="col-span-6 lg:col-span-2 md:col-span-3">{col1Name}</div>
          <div className="hidden md:flex lg:col-span-7 md:col-span-6">{col2Name}</div>
          <div className="col-span-6 lg:col-span-3 md:col-span-3">{col3Name}</div>
        </div>
      </div>
      <div>
        {data &&
          data.length > 0 &&
          data.map((ele, index) => (
            <div className="mx-8 grid grid-cols-12 text-[#292D32] py-4 border-b border-[#EEEEEE]" key={index}>
              <div className="col-span-6 lg:col-span-2 md:col-span-3 overflow-hidden text-ellipsis whitespace-nowrap mr-2">
                {ele[col1]}
              </div>
              <div className="hidden md:flex lg:col-span-7 md:col-span-6 overflow-hidden text-ellipsis whitespace-nowrap mr-4">
                {ele[col2]}
              </div>
              <div className="col-span-6 lg:col-span-3 md:col-span-3">{ele[col3]}</div>
            </div>
          ))}
        {(!data || data.length === 0) && (
          <div className="w-full flex justify-center items-center">No available data</div>
        )}
      </div>
      <div className="mx-8 py-8">
        <Pagination totalLength={395} limit={10} pageCount={40} page={1} />
      </div>
    </>
  );
}

export default CustomTable;
