import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <>
      <div>ProtectedLayout</div>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
