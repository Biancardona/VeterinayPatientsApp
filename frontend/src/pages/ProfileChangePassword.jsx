import { useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alert from "../components/Alert";

const ProfileChangePassword = () => {
  const initialPasswordState = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [password, setPassword] = useState(initialPasswordState);

  const [alerta, setAlerta] = useState({});
  const { editPassword } = useAuth();
  const { msg } = alerta;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(password).some((campo) => campo === "")) {
      setAlerta({ msg: "Campo vacio intenta de nuevo", error: true });
      return;
    }
    if (password.newPassword.length <= 6) {
      setAlerta({ msg: "Minimo 6 caracteres", error: true });
      return;
    }
    if (password.newPassword !== password.confirmPassword) {
      setAlerta({ msg: "Contraseñas no coinciden", error: true });
      return;
    }
    const resultPassword = await editPassword(password);
    setAlerta(resultPassword);
    // Limpiar el formulario
    setPassword({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">
        Cambiar Password
      </h2>
      <p className="text-xl mb-10 mt-10 text-center">
        Modifica tu <span className="text-indigo-500 font-bold">Password </span>
      </p>
      <div className="flex justify-center ">
        <div className="w-full bg-white shadow p-5">
          {msg && <Alert alert={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="text-gray-600 uppercase font-bold">
                {" "}
                Password Anterior
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full pt-2 mt-5  mb-5 rounded-lg"
                name="currentPassword"
                autoComplete="on"
                placeholder="Escribe tu password anterior"
                value={password.currentPassword}
                onChange={(e) =>
                  setPassword({ ...password, [e.target.name]: e.target.value })
                }
              ></input>
            </div>
            <div className="my-3">
              <label className="text-gray-600 uppercase font-bold">
                {" "}
                Nuevo Password
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full pt-2 mt-5 rounded-lg"
                name="newPassword"
                autoComplete="on"
                value={password.newPassword}
                placeholder="Escribe tu nuevo password"
                onChange={(e) =>
                  setPassword({ ...password, [e.target.name]: e.target.value })
                }
              ></input>
            </div>
            <div className="my-3">
              <label className="text-gray-600 uppercase font-bold">
                {" "}
                Confirma el nuevo Password
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full pt-2 mt-5 rounded-lg"
                name="confirmPassword"
                value={password.confirmPassword}
                autoComplete="on"
                placeholder="Confirma tu nuevo password"
                onChange={(e) =>
                  setPassword({ ...password, [e.target.name]: e.target.value })
                }
              ></input>
            </div>

            <input
              type="submit"
              className="border w-full p-3 mt-5 my-5 px-10 bg-indigo-600 text-white uppercase rounded-xl font-bold hover:cursor-pointer hover:bg-indigo-900"
              value=" Actualizar password"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileChangePassword;
