import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu
          <spam className="text-black"> Password</spam>
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
          <input
            type="submit"
            value="Enviar Instrucciones"
            className="border w-full py-3 mt-5 my-5 px-10 bg-indigo-600 text-white uppercase rounded-xl font-bold hover:cursor-pointer hover:bg-indigo-900"
          />
          <nav className="mt-5 lg:flex lg:justify-between">
            <NavLink to="/" className="block text-gray-400 text-center my-5">
              Ya tienes cuenta? Inicia Sesion
            </NavLink>
            <NavLink
              to="/register"
              className="block text-gray-400 text-center my-5"
            >
              Aun no tienes cuenta? Registrate
            </NavLink>
          </nav>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
