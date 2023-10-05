import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { signOut } = useAuth();
  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl text-indigo-200 text-center">
          Administrator Veterinarians{" "}
          <spam className="text-white"> Patients </spam>
        </h1>
        <nav className="flex flex-col items-center lg:flex-row mt-5 lg:mt-0 gap-4">
          <Link className="text-white uppercase" to="/admin">
            {" "}
            Pacientes{" "}
          </Link>
          <Link className="text-white uppercase" to="/admin/profile">
            {" "}
            Perfil{" "}
          </Link>
          <button
            type="button"
            className="text-white uppercase"
            onClick={signOut}
          >
            {" "}
            Cerrar Sesion
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
