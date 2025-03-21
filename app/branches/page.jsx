'use client';

import Image from 'next/image';
import { AdminLayout } from '@/layouts';
import { CustomTable } from '@/components/tables';
import { MainContent } from '@/components/widgets';
import { Toaster, withAuth } from '@/helpers';
import { branchListUrl, branchUpdateUrl } from '@/consts';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store';

import eyeIcon from '@/public/icons/icon-eye.svg';
import deleteIcon from '@/public/icons/icon-delete.svg';
import stopIcon from '@/public/icons/icon-stop.svg';
import approvalIcon from '@/public/icons/icon-approval.svg';

import '@/styles/all.css';
import { useApiRequest } from '@/hooks';

const BranchList = () => {
  const userState = useAppSelector((state) => state.user);

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const {
    response: dataResponse,
    error: dataError,
    loading: dataLoading,
    sendRequest: sendDataRequest,
  } = useApiRequest({
    endpoint: branchListUrl,
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
    endpoint: branchUpdateUrl,
    method: 'PUT',
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
    dataResponse && dataResponse.data && setData(dataResponse.data.branches);
    dataResponse && dataResponse.data && setPagination(dataResponse.data.pagination);
  }, [dataResponse]);

  useEffect(() => {
    dataError && Toaster.error(dataError.message);
  }, [dataError]);

  useEffect(() => {
    if (updateResponse) {
      const res = updateResponse.data;
      const newData = data.map((ele) => {
        if (ele._id !== updateResponse.data.id) return ele;
        else return { ...ele, ...res };
      });
      setData(newData);
      Toaster.success(updateResponse.message);
    }
  }, [updateResponse]);

  useEffect(() => {
    updateError && Toaster.error(updateError.message);
  }, [updateError]);

  return (
    <AdminLayout background="admin-dash">
      <div className="grid grid-cols-12 justify-center items-center basis-auto w-full">
        <div className="lg:col-start-3 lg:col-span-8 col-start-2 col-span-10">
          <MainContent>
            <CustomTable
              name="All Branches"
              col1Name="Branch Name"
              col2Name="Address"
              col3Name="Actions"
              col1="title"
              col2="address"
              col3={(ele) => (
                <div className="flex justify-center items-center">
                  <button className="bg-[#FFF6F6] p-[9px] rounded cursor-pointer shadow-[0px_4px_4px_rgba(0,0,0,0.30)] m-1">
                    <Image src={eyeIcon} alt="Show Icon" height={20} />
                  </button>
                  <button className="bg-[#FFF6F6] p-[9px] rounded cursor-pointer shadow-[0px_4px_4px_rgba(0,0,0,0.30)] m-1">
                    <Image src={deleteIcon} alt="Delete Icon" height={20} />
                  </button>
                  {ele.isActive && (
                    <button
                      className="bg-[#FFF6F6] p-[9px] rounded cursor-pointer shadow-[0px_4px_4px_rgba(0,0,0,0.30)] m-1"
                      onClick={() => sendUpdateRequest({ isActive: false }, {}, `/${ele._id}`)}
                    >
                      <Image src={stopIcon} alt="Stop Icon" height={20} />
                    </button>
                  )}
                  {!ele.isActive && (
                    <button
                      className="bg-[#FFF6F6] p-[9px] rounded cursor-pointer shadow-[0px_4px_4px_rgba(0,0,0,0.30)] m-1"
                      onClick={() => sendUpdateRequest({ isActive: true }, {}, `/${ele._id}`)}
                    >
                      <Image src={approvalIcon} alt="Approval Icon" height={20} />
                    </button>
                  )}
                </div>
              )}
              data={data}
              sorts={['title']}
              addButton
              addUrl="/branches/new"
              pagination={pagination}
              pageClick={handlePageClick}
            />
          </MainContent>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(BranchList);
