import { NavbarWithoutUser } from '@/components/navbars';

const SuperAdminLayout = ({ background, children }) => {
  return (
    <div className="bg-[white] box-border flex justify-start items-stretch">
      <div className={`background-${background} box-border w-full`} style={{ minHeight: '100vh' }}>
        <NavbarWithoutUser />
        {children}
      </div>
    </div>
  );
};

export default SuperAdminLayout;
