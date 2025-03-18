import { NavbarWithUser } from '@/components/navbars';

const AdminLayout = ({ background, children }) => {
  return (
    <div className="bg-[white] box-border flex justify-start items-stretch">
      <div className={`background-${background} box-border w-full`} style={{ minHeight: '100vh' }}>
        <NavbarWithUser />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
