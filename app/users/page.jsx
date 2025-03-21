'use client';

import Image from 'next/image';
import { AdminLayout } from '@/layouts';
import { CustomTable } from '@/components/tables';
import { MainContent, StatusBadge } from '@/components/widgets';

import { useAppSelector } from '@/store';
import { useEffect, useState } from 'react';
import { useApiRequest } from '@/hooks';
import { userListUrl } from '@/consts';
import { Toaster, withAuth } from '@/helpers';

import eyeIcon from '@/public/icons/icon-eye.svg';
import deleteIcon from '@/public/icons/icon-delete.svg';

import '@/styles/all.css';

const UserList = () => {
  const userState = useAppSelector((state) => state.user);

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const {
    response: dataResponse,
    error: dataError,
    loading: dataLoading,
    sendRequest: sendDataRequest,
  } = useApiRequest({
    endpoint: userListUrl,
    method: 'GET',
    headers: {
      authorization: `Bearer ${userState.token}`,
    },
  });

  const handlePageClick = async (page, limit, search, sort) => {
    await sendDataRequest(
      {},
      {
        page,
        limit,
        search,
        sort,
      },
    );
  };

  useEffect(() => {
    userState && userState.token && sendDataRequest();
  }, [userState]);

  useEffect(() => {
    dataResponse && dataResponse.data && setData(dataResponse.data.users);
    dataResponse && dataResponse.data && setPagination(dataResponse.data.pagination);
  }, [dataResponse]);

  useEffect(() => {
    dataError && Toaster.error(dataError.message);
  }, [dataError]);

  return (
    <AdminLayout background="proposals-list">
      <div className="grid grid-cols-12 justify-center items-center basis-auto w-full">
        <div className="lg:col-start-3 lg:col-span-8 col-start-2 col-span-10">
          <MainContent>
            <CustomTable
              name="All Users"
              col1Name="Name"
              col2Name="Role"
              col3Name="Actions"
              col1="name"
              col2="role"
              col3={(ele) => (
                <div className="flex justify-center items-center">
                  <button className="bg-[#FFF6F6] p-[9px] rounded cursor-pointer shadow-[0px_4px_4px_rgba(0,0,0,0.30)] m-1">
                    <Image src={eyeIcon} alt="Show Icon" height={20} />
                  </button>
                  {ele.role === 'user' && (
                    <button className="bg-[#FFF6F6] p-[9px] rounded cursor-pointer shadow-[0px_4px_4px_rgba(0,0,0,0.30)] m-1">
                      <Image src={deleteIcon} alt="Delete Icon" height={20} />
                    </button>
                  )}
                </div>
              )}
              data={data}
              sorts={[]}
              pagination={pagination}
              pageClick={handlePageClick}
            />
          </MainContent>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(UserList);
