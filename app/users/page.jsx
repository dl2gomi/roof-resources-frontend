import Image from 'next/image';
import { SuperAdminLayout } from '@/layouts';

import logo from '@/public/img/logo.png';

import '@/styles/all.css';
import { CustomTable } from '@/components/tables';
import { MainContent } from '@/components/widgets';

const mockData = [
  {
    name: 'Jane Cooper',
    branch: 'Admin',
  },
  {
    name: 'Floyd Miles',
    branch: 'User',
  },
];

export default function UsersList() {
  return (
    <SuperAdminLayout background="proposals-list">
      <div className="grid grid-cols-12 justify-center items-center basis-auto w-full">
        <div className="lg:col-start-3 lg:col-span-8 col-start-2 col-span-10">
          <MainContent>
            <CustomTable
              name="All Users"
              col1Name="Admin Name"
              col2Name="Status"
              col3Name="Status"
              col1="name"
              col2="branch"
              data={mockData}
            />
          </MainContent>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
