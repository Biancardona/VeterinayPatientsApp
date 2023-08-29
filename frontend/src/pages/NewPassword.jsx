import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from "../config/axios";
import Alert from "../components/Alert";
import { NavLink } from "react-router-dom";

const NewPassword = () => {
  //Hook useParams to read the parameters from the URLS
  const params = useParams();
  //Destructuring token from params(token is te way its called in the routes)
  const { token } = params;
  const [password, setPassword] = useState("");
  const [confirmedToken, setconfirmedToken] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [confirmPassword, setconfirmPassword] = useState(false);

  //Hook useEffect to be executed once the componente is loaded
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === "") {
      setAlerta({ msg: "Campo Obligatorio", error: true });
      return;
    }
    if (password.length <= 6) {
      setAlerta({
        msg: "Password muy corto, agrega minimo 6 caracteres",
        error: true,
      });
      return;
    }
    setAlerta({});

    try {
      const { data } = await axiosClient.post(
        `/veterinarians/forgotPassword/${token}`,
        {
          password,
        }
      );
      setconfirmPassword(true);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPassword("");
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  //Hook useEffect is going to be executed once the component is load
  useEffect(() => {
    const cofirmPassword = async () => {
      try {
        const url = `/veterinarians/forgotPassword/${token}`;
        //data is the Axios response
        await axiosClient(url);
        setconfirmedToken(true);
        setAlerta({
          msg: "Usuario autenticado, coloca tu nuevo passaword",
        });
      } catch (error) {
        setAlerta({
          msg: "Hubo un error con la autenticacion",
          error: true,
        });
      }
    };
    cofirmPassword();
  }, []);

  const { msg } = alerta;

  //Cuando ya no este cargando entonces muestra la alerta (ya sea error o confirmacion de cuenta )

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu
          <spam className="text-black"> Password</spam>
        </h1>
      </div>

      <div className="mt 20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alerta} />}{" "}
        {confirmedToken && (
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-l font-bold">
                New Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="New Password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              />
            </div>
            <input
              type="submit"
              value="Reestablecer Password"
              className="border w-full py-3 mt-5 my-5 px-10 bg-indigo-600 text-white uppercase rounded-xl font-bold hover:cursor-pointer hover:bg-indigo-900"
            />
            {confirmPassword && (
              <NavLink to="/" className="block text-gray-400 text-center my-5">
                Inicia Sesion
              </NavLink>
            )}
          </form>
        )}
      </div>
    </>
  );
};

export default NewPassword;
