import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

const ProtectedLayout = () => {
  //To use the context information, applying destructuring and call the useAuth function
  const { auth, load } = useAuth();
  console.log(auth);
  console.log(load);
  if (load) return "Cargando...";

  return (
    <>
      <Header />
      {auth?._id ? (
        <main className="container mx-auto mt-10">
          <Outlet />{" "}
        </main>
      ) : (
        <Navigate to="/" />
      )}
      <Footer />
    </>
  );
};

export default ProtectedLayout;
