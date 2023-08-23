import { useState } from "react";
import { NavLink } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axios";

const Register = () => {
  //value, and the function that modify the state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, email, telephone, password, confirmPassword].includes("")) {
      setAlerta({ msg: "Campo vacio intenta de nuevo", error: true });
      return;
    }
    if (password !== confirmPassword) {
      setAlerta({
        msg: "No coincide la contraseña, intenta de nuevo",
        error: true,
      });
      return;
    }
    if (password.length <= 6) {
      setAlerta({
        msg: "Password muy corto, agrega minimo 6 caracteres",
        error: true,
      });
      return;
    }
    //Objecto vacio para el caso que todos los campos esten ingresados correctamente, para que ya no se muestre la alerta
    setAlerta({});
    //Creating user in the API

    try {
      //variable que contenga la peticion axios, recibe, la url y los datos por medio de un objeto
      await axiosClient.post("/veterinarians", {
        name,
        email,
        telephone,
        password,
      });
      setAlerta({
        msg: "Usuario creado correctamente, reivsa tu email para confirmar cuenta",
        error: false,
      });
      setName("");
      setEmail("");
      setPassword("");
      setTelephone("");
      setconfirmPassword("");
    } catch (error) {
      setAlerta({
        //msg esta definido en el componmente de alerta y aqui ya se le pasa loq eu va a mostrar
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  //Para que no se aplique las clases de la alerta, extraer de alerta el mensaje(crear variable para antes de mopstrarlo en el componente)
  //Si la variable msg es verdadera, entonces se renderizará el componente Alerta con el valor de la propiedad alerta igual a la variable alerta.
  //Si la variable msg es falsa, entonces no se renderizará nada.
  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea una cuenta y Administra tus
          <spam className="text-black"> Pacientes</spam>
        </h1>
      </div>
      <div className="mt 20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-l font-bold">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="name"
              placeholder="Full Name"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-l font-bold">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Register Email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-l font-bold">
              Telephone
            </label>
            <input
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              type="telephone"
              placeholder="Telephone"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-l font-bold">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-l font-bold">
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />

            <input
              type="submit"
              value="Iniciar Sesion"
              className="border w-full p-3 mt-5 my-5 px-10 bg-indigo-600 text-white uppercase rounded-xl font-bold hover:cursor-pointer hover:bg-indigo-900"
            />
          </div>
          <nav className="mt-10 lg:flex lg:justify-between">
            <NavLink to="/" className="block text-gray-400 text-center my-5">
              Ya tienes cuenta? Inicia Sesion
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

export default Register;
