import { NavLink } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../config/axios";
import Alert from "../components/Alert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setAlerta({ msg: "Email Obligatorio", error: true });
      return;
    }
    //In case the email is entered correctly: setAlerta with empty object to avoid showing any alert
    setAlerta({});
    //We require the user email
    try {
      const url = `/veterinarians/forgotPassword`;
      //Make the call the same way is in postman (with POST)to generate the token
      const { data } = await axiosClient.post(url, { email });

      setAlerta({
        msg: "Email enviado para reestablecer passoword",
        error: false,
      });
      setEmail("");
      console.log(data);
    } catch (error) {
      setAlerta({
        //msg esta definido en el componmente de alerta y aqui ya se le pasa loq eu va a mostrar
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  //Extract msg from alert
  const { msg } = alert;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu
          <spam className="text-black"> Password</spam>
        </h1>
      </div>
      <div>
        <div className="mt 20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          {msg && <Alert alert={alert} />}
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Email
              </label>
              <input
                type="email"
                placeholder="Email de Registro"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
      </div>
    </>
  );
};

export default ForgotPassword;
