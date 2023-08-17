import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia Sesion y Administra tus
          <spam className="text-black"> Pacientes</spam>
        </h1>
      </div>
      <div>
        <form>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
            <input
              type="submit"
              value="Iniciar Sesion"
              className="border w-full p-3 mt-5 my-5 px-10 bg-indigo-600 text-white uppercase rounded-xl font-bold hover:cursor-pointer hover:bg-indigo-900"
            />
          </div>
          <nav className="mt-5 lg:flex lg:justify-between">
            <NavLink
              to="/register"
              className="block text-gray-400 text-center my-5"
            >
              Aun no tienes cuenta? Registrate
            </NavLink>
            <NavLink
              to="/forgot-password"
              className="block text-gray-400 text-center my-5"
            >
              Olvide mi contraseña
            </NavLink>
          </nav>
        </form>
      </div>
    </>
  );
};

export default Login;
