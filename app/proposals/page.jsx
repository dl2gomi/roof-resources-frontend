'use client';

import Image from 'next/image';
import { AdminLayout } from '@/layouts';
import { CustomTable } from '@/components/tables';
import { Card, MainContent, StatusBadge } from '@/components/widgets';

import { useAppSelector } from '@/store';
import { useEffect, useState } from 'react';
import { useApiRequest } from '@/hooks';
import { proposalListUrl, proposalMailUrl, proposalShowUrl, proposalUpdateUrl } from '@/consts';
import { openMailWindow, Toaster, withAuth } from '@/helpers';

import logo from '@/public/img/logo.png';
import eyeIcon from '@/public/icons/icon-eye.svg';
import deleteIcon from '@/public/icons/icon-delete.svg';
import stopIcon from '@/public/icons/icon-stop.svg';
import approvalIcon from '@/public/icons/icon-approval.svg';

import '@/styles/all.css';
import { OverlayModal } from '@/components/modals';
import { useRouter } from 'next/navigation';

const ProposalList = () => {
  const userState = useAppSelector((state) => state.user);
  const router = useRouter();

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [proposal, setProposal] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    response: dataResponse,
    error: dataError,
    loading: dataLoading,
    sendRequest: sendDataRequest,
  } = useApiRequest({
    endpoint: proposalListUrl,
    method: 'GET',
    headers: {
      authorization: `Bearer ${userState.token}`,
    },
  });

  const {
    response: showResponse,
    error: showError,
    loading: showLoading,
    sendRequest: sendShowRequest,
  } = useApiRequest({
    endpoint: proposalShowUrl,
    method: 'GET',
    headers: {
      authorization: `Bearer ${userState.token}`,
    },
  });

  const {
    response: mailResponse,
    error: mailError,
    loading: mailLoading,
    sendRequest: sendMailRequest,
  } = useApiRequest({
    endpoint: proposalMailUrl,
    method: 'POST',
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
    endpoint: proposalUpdateUrl,
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

  const handleSend = () => {
    console.log(proposal);
    if (!sent) sendMailRequest({ id: proposal.id });
    else sendUpdateRequest({ isSent: true }, {}, `/${proposal.id}`);
  };

  useEffect(() => {
    userState && userState.token && sendDataRequest();
  }, [userState]);

  useEffect(() => {
    dataResponse && dataResponse.data && setData(dataResponse.data.proposals);
    dataResponse && dataResponse.data && setPagination(dataResponse.data.pagination);
  }, [dataResponse]);

  useEffect(() => {
    dataError && Toaster.error(dataError.message);
  }, [dataError]);

  useEffect(() => {
    if (showResponse) {
      showResponse.data && setProposal(showResponse.data);
      setModalOpen(true);
    }
  }, [showResponse]);

  useEffect(() => {
    showError && Toaster.error(showError.message);
  }, [showError]);

  useEffect(() => {
    mailResponse && mailResponse.data.mailBody && openMailWindow(mailResponse.data.mailBody);
    mailResponse && mailResponse.data.mailBody && setSent(true);
    mailResponse && Toaster.success(mailResponse.message);
  }, [mailResponse]);

  useEffect(() => {
    mailError && Toaster.error(mailError.message);
  }, [mailError]);

  useEffect(() => {
    updateResponse && Toaster.success(updateResponse.message);
    updateResponse && router.push('/proposals');
  }, [updateResponse]);

  useEffect(() => {
    updateError && Toaster.error(updateError.message);
  }, [updateError]);

  return (
    <>
      <AdminLayout background="proposals-list">
        <div className="grid grid-cols-12 justify-center items-center basis-auto w-full">
          <div className="lg:col-start-3 lg:col-span-8 col-start-2 col-span-10">
            <MainContent>
              <CustomTable
                name="All Proposals"
                col1Name="Customer Name"
                col2Name="Address"
                col3Name="Status"
                col1="name"
                col2="address"
                col3={(ele) => (
                  <div className="flex justify-center items-center">
                    <StatusBadge
                      text={ele.isSent ? 'SENT' : 'UNSENT'}
                      success={ele.isSent}
                      error={!ele.isSent}
                      style={{ marginRight: '1rem' }}
                    />
                    <button
                      className="bg-[#FFF6F6] p-[9px] rounded cursor-pointer shadow-[0px_4px_4px_rgba(0,0,0,0.30)] m-1"
                      onClick={() => {
                        sendShowRequest({}, {}, `${ele._id}`);
                      }}
                    >
                      <Image src={eyeIcon} alt="Show Icon" height={20} />
                    </button>
                    <button className="bg-[#FFF6F6] p-[9px] rounded cursor-pointer shadow-[0px_4px_4px_rgba(0,0,0,0.30)] m-1">
                      <Image src={deleteIcon} alt="Delete Icon" height={20} />
                    </button>
                  </div>
                )}
                data={data}
                sorts={[]}
                addButton
                addUrl="/proposals/new"
                pagination={pagination}
                pageClick={handlePageClick}
              />
            </MainContent>
          </div>
        </div>
      </AdminLayout>
      <OverlayModal
        isOpen={modalOpen}
        onClose={() => {
          setProposal({});
          setSent(false);
          setModalOpen(false);
        }}
        title="Proposal Detail"
      >
        <div className="my-2">
          <div className="text-4xl font-bold uppercase my-1 flex items-center">
            <span className="mr-3">{proposal.customer?.name}</span>
            <StatusBadge
              text={proposal.isSent ? 'SENT' : 'DRAFT'}
              success={proposal.isSent}
              error={!proposal.isSent}
              style={{ marginRight: '1rem' }}
            />
          </div>
          <div className="text-gray-500 my-1">{proposal.customer?.address}</div>
        </div>
        <div className="my-2 flex">
          <Card
            title="Total Price"
            content={(
              proposal.pricing?.projectFee +
                proposal.pricing?.laborPermit +
                proposal.pricing?.materials +
                proposal.pricing?.dumpster ?? 0
            ).toFixed(2)}
            subContent={proposal.pricing?.averageRetail.toFixed(2)}
          />
        </div>
        <div className="my-2 grid grid-cols-2 md:grid-cols-4 gap-2">
          <Card title="Project Fee" content={(proposal.pricing?.projectFee ?? 0).toFixed(2)} />
          <Card title="Materials" content={(proposal.pricing?.materials ?? 0).toFixed(2)} />
          <Card title="Dumpster" content={(proposal.pricing?.dumpster ?? 0).toFixed(2)} />
          <Card title="Labor / Permit" content={(proposal.pricing?.laborPermit ?? 0).toFixed(2)} />
        </div>
        <div className="uppercase text-sm font-bold mt-4">Measurements</div>
        <div className="my-2 grid grid-cols-2 md:grid-cols-4  gap-2">
          <Card title="House" content={(proposal.detail?.house ?? 0).toFixed(2)} />
          <Card title="Squares" content={(proposal.detail?.squares ?? 0).toFixed(2)} />
          <Card title="Total Squares" content={(proposal.detail?.totalSquares ?? 0).toFixed(2)} />
          <Card title="Percent of Waste" content={(proposal.detail?.percentWaste ?? 0).toFixed(2)} />
          <Card
            title="Garage"
            content={proposal.detail?.garage === true ? 'YES' : proposal.detail?.garage === false ? 'NO' : 'N/A'}
          />
          <Card
            title="Shed"
            content={proposal.detail?.shed === true ? 'YES' : proposal.detail?.shed === false ? 'NO' : 'N/A'}
          />
          <Card
            title="Flat Roof"
            content={proposal.detail?.flatroof === true ? 'YES' : proposal.detail?.flatroof === false ? 'NO' : 'N/A'}
          />
          <Card
            title="Skylight"
            content={proposal.detail?.skylight === true ? 'YES' : proposal.detail?.skylight === false ? 'NO' : 'N/A'}
          />
        </div>
        <div className="uppercase text-sm font-bold mt-4">Installation Day</div>
        <div className="my-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6  gap-2">
          <StatusBadge
            text="Complete Deluxe Tear-Off"
            success={proposal.options?.deluxeTearOff}
            error={!proposal.options?.deluxeTearOff}
            style={{ width: 'auto' }}
          />
          <StatusBadge
            text="Roof Deck Inspection & Installation"
            success={proposal.options?.roofDeck}
            error={!proposal.options?.roofDeck}
            style={{ width: 'auto' }}
          />
          <StatusBadge
            text="Continuous Ridge Ventilation System"
            success={proposal.options?.ridgeVent}
            error={!proposal.options?.ridgeVent}
            style={{ width: 'auto' }}
          />
          <StatusBadge
            text="Install the following"
            success={proposal.options?.installFollow}
            error={!proposal.options?.installFollow}
            style={{ width: 'auto' }}
          />
          <StatusBadge
            text="Estimate"
            success={proposal.options?.estimate}
            error={!proposal.options?.estimate}
            style={{ width: 'auto' }}
          />
          <StatusBadge
            text="Exhaust Ventilation (Can Vents)"
            success={proposal.options?.exhaustVent}
            error={!proposal.options?.exhaustVent}
            style={{ width: 'auto' }}
          />
        </div>
        <div className="mb-2 mt-5">
          <div className="text-3xl font-bold uppercase my-1 flex items-center justify-end">
            <span className="lowercase mr-2 text-gray-400 text-lg hidden md:inline">at</span>{' '}
            <span className="mr-3 text-xl hidden md:inline">{new Date(proposal.createdAt).toLocaleString()}</span>
            <span className="lowercase mr-2 text-gray-400 text-lg">by</span>{' '}
            <span className="mr-3 text-xl">{proposal.admin?.name}</span>
            <span className="lowercase mr-2 text-gray-400 text-lg">{' | '}</span>
            <span className="mr-3 text-xl">{proposal.admin?.email}</span>
          </div>
        </div>
        {!proposal.isSent && (
          <div className="mt-2 grid grid-cols-1 gap-2">
            <button
              disabled={mailLoading || updateLoading}
              onClick={handleSend}
              className="rounded bg-[#1e3c55] w-full my-2 py-3 shadow-[0px_4px_4px_rgba(0,0,0,0.30)] [font-family:Montserrat,sans-serif] text-base font-semibold uppercase text-[white] cursor-pointer block box-border border-[none]"
            >
              {!sent && mailLoading && 'Sending...'}
              {!sent && !mailLoading && 'Send'}
              {sent && updateLoading && 'Confirming...'}
              {sent && !updateLoading && 'Confirm Send'}
            </button>
          </div>
        )}
      </OverlayModal>
    </>
  );
};

export default withAuth(ProposalList);
