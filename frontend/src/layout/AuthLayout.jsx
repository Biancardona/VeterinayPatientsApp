import { Outlet } from "react-router-dom";
//Outlet carga los componentes hijos que estan en el router
const AuthLayout = () => {
  return (
    <>
      <h1>Desde Layout</h1>
      <Outlet />
    </>
  );
};

export default AuthLayout;
