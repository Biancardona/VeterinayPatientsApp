import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-2xl text-indigo-200">
          Administrator Veterinarians{" "}
          <spam className="text-white"> Patients </spam>
        </h1>
        <nav className="flex gap-4">
          <Link className="text-white uppercase" to="/admin">
            {" "}
            Pacientes{" "}
          </Link>
          <Link className="text-white uppercase" to="/perfil">
            {" "}
            Perfil{" "}
          </Link>
          <button type="button" className="text-white uppercase">
            {" "}
            Cerrar Sesion
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
