'use client';

import Image from 'next/image';
import { AdminLayout } from '@/layouts';
import { CustomTable } from '@/components/tables';
import { MainContent, StatusBadge } from '@/components/widgets';

import { useAppSelector } from '@/store';
import { useEffect, useState } from 'react';
import { useApiRequest } from '@/hooks';
import { invoiceListUrl, proposalListUrl } from '@/consts';
import { Toaster, withAuth } from '@/helpers';

import eyeIcon from '@/public/icons/icon-eye.svg';
import deleteIcon from '@/public/icons/icon-delete.svg';

import '@/styles/all.css';

const InvoiceList = () => {
  const userState = useAppSelector((state) => state.user);

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const {
    response: dataResponse,
    error: dataError,
    loading: dataLoading,
    sendRequest: sendDataRequest,
  } = useApiRequest({
    endpoint: invoiceListUrl,
    method: 'GET',
    headers: {
      authorization: `Bearer ${userState.token}`,
    },
  });

  // const {
  //   response: updateResponse,
  //   error: updateError,
  //   loading: updateLoading,
  //   sendRequest: sendUpdateRequest,
  // } = useApiRequest({
  //   endpoint: branchUpdateUrl,
  //   method: 'PUT',
  //   headers: {
  //     authorization: `Bearer ${userState.token}`,
  //   },
  // });

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
    dataResponse && dataResponse.data && setData(dataResponse.data.invoices);
    dataResponse && dataResponse.data && setPagination(dataResponse.data.pagination);
  }, [dataResponse]);

  useEffect(() => {
    dataError && Toaster.error(dataError.message);
  }, [dataError]);

  return (
    <AdminLayout background="invoices-list">
      <div className="grid grid-cols-12 justify-center items-center basis-auto w-full">
        <div className="lg:col-start-3 lg:col-span-8 col-start-2 col-span-10">
          <MainContent>
            <CustomTable
              name="All Invoices"
              col1Name="Customer Name"
              col2Name="Address"
              col3Name="Status"
              col1="name"
              col2="address"
              col3={(ele) => (
                <div className="flex justify-center items-center">
                  <StatusBadge
                    text={ele.paidAt ? 'PAID' : 'UNPAID'}
                    success={ele.paidAt}
                    error={!ele.paidAt}
                    style={{ marginRight: '1rem' }}
                  />
                  <button className="bg-[#FFF6F6] p-[9px] rounded cursor-pointer shadow-[0px_4px_4px_rgba(0,0,0,0.30)] m-1">
                    <Image src={eyeIcon} alt="Show Icon" height={20} />
                  </button>
                  <button className="bg-[#FFF6F6] p-[9px] rounded cursor-pointer shadow-[0px_4px_4px_rgba(0,0,0,0.30)] m-1">
                    <Image src={deleteIcon} alt="Delete Icon" height={20} />
                  </button>
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

export default withAuth(InvoiceList);
