import Image from 'next/image';
import { SuperAdminLayout } from '@/layouts';

import logo from '@/public/img/logo.png';

import '@/styles/all.css';
import { CustomTable } from '@/components/tables';
import { MainContent } from '@/components/widgets';

const mockData = [
  {
    branch: 'Jane Cooper',
    address: 'Elm Street, Suite 3, Los Angeles, CA 90001, USA',
  },
  {
    branch: 'Floyd Miles',
    address: '132 My Street, Kingston, New York 12401',
  },
  {
    branch: 'Ronald Richards',
    address: '132 My Street, Kingston, New York 12401',
  },
  {
    branch: 'Marvin McKinney',
    address: 'Elm Street, Suite 3, Los Angeles, CA 90001, USA',
  },
  {
    branch: 'Jerome Bell',
    address: 'Elm Street, Suite 3, Los Angeles, CA 90001, USA',
  },
  {
    branch: 'Kathryn Murphy',
    address: 'Elm Street, Suite 3, Los Angeles, CA 90001, USA',
  },
  {
    branch: 'Jacob Jones',
    address: 'Elm Street, Suite 3, Los Angeles, CA 90001, USA',
  },
  {
    branch: 'Kristin Watson',
    address: '132 My Street, Kingston, New York 12401',
  },
];

export default function BranchList() {
  return (
    <SuperAdminLayout background="admin-dash">
      <div className="grid grid-cols-12 justify-center items-center basis-auto w-full">
        <div className="lg:col-start-3 lg:col-span-8 col-start-2 col-span-10">
          <MainContent>
            <CustomTable
              name="All Branches"
              col1Name="Branch Name"
              col2Name="Address"
              col3Name="Actions"
              col1="branch"
              col2="address"
              data={mockData}
              sorts={['Name']}
              addButton
            />
          </MainContent>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
