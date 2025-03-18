import Image from 'next/image';
import { AdminLayout } from '@/layouts';

import logo from '@/public/img/logo.png';

import '@/styles/all.css';
import { CustomTable } from '@/components/tables';
import { MainContent } from '@/components/widgets';

const mockData = [
  {
    customer: 'Jane Cooper',
    address: 'Elm Street, Suite 3, Los Angeles, CA 90001, USA',
  },
  {
    customer: 'Floyd Miles',
    address: '132 My Street, Kingston, New York 12401',
  },
  {
    customer: 'Ronald Richards',
    address: '132 My Street, Kingston, New York 12401',
  },
  {
    customer: 'Marvin McKinney',
    address: 'Elm Street, Suite 3, Los Angeles, CA 90001, USA',
  },
  {
    customer: 'Jerome Bell',
    address: 'Elm Street, Suite 3, Los Angeles, CA 90001, USA',
  },
  {
    customer: 'Kathryn Murphy',
    address: 'Elm Street, Suite 3, Los Angeles, CA 90001, USA',
  },
  {
    customer: 'Jacob Jones',
    address: 'Elm Street, Suite 3, Los Angeles, CA 90001, USA',
  },
  {
    customer: 'Kristin Watson',
    address: '132 My Street, Kingston, New York 12401',
  },
];

export default function ProposalList() {
  return (
    <AdminLayout background="proposals-list">
      <div className="grid grid-cols-12 justify-center items-center basis-auto w-full">
        <div className="lg:col-start-3 lg:col-span-8 col-start-2 col-span-10">
          <MainContent>
            <CustomTable
              name="All Proposals"
              col1Name="Customer Name"
              col2Name="Address"
              col3Name="Status"
              col1="customer"
              col2="address"
              data={mockData}
              sorts={['Name']}
              addButton
              addUrl="/proposals/new"
            />
          </MainContent>
        </div>
      </div>
    </AdminLayout>
  );
}
