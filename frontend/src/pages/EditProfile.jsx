import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";

const EditProfile = () => {
  //No cambiar el state original hasta que no se hayan almacenado los cambios(usar useEffect)
  //Crear un state local
  //para que tome una copia del objeto
  //Toma una copia de lo que hay en el state (profile), va a reescribir en el campo del objeto que este asociado
  //con el input(con el spread operator)
  //Se asocia con el valor nombre del input
  const { auth } = useAuth();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile(auth);
  }, [auth]);
  console.log(auth);

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mb-10 mt-10 text-center">
        Modifica tus <span className="text-indigo-500 font-bold">Datos </span>
      </p>
      <div className="flex justify-center ">
        <div className="w-full bg-white shadow p-5">
          <form>
            <div className="my-3">
              <label className="text-gray-600 uppercase font-bold">
                {" "}
                Nombre
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full pt-2 mt-5 rounded-lg"
                name="name"
                value={profile.name || ""}
                onChange={(e) =>
                  setProfile({ ...profile, [e.target.name]: e.target.value })
                }
              ></input>
            </div>
            <div className="my-3">
              <label className="text-gray-600 uppercase font-bold">
                {" "}
                Web Site
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full pt-2 mt-5 rounded-lg"
                name="Web"
              ></input>
            </div>
            <div className="my-3">
              <label className="text-gray-600 uppercase font-bold">
                {" "}
                Email
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full pt-2 mt-5 rounded-lg"
                name="email"
                value={profile.email || ""}
                onChange={(e) =>
                  setProfile({ ...profile, [e.target.email]: e.target.value })
                }
              ></input>
            </div>
            <div className="my-3">
              <label className="text-gray-600 uppercase font-bold">
                {" "}
                Telephone
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full pt-2 mt-5 rounded-lg"
                name="telefono"
              ></input>
            </div>

            <input
              type="submit"
              className="border w-full p-3 mt-5 my-5 px-10 bg-indigo-600 text-white uppercase rounded-xl font-bold hover:cursor-pointer hover:bg-indigo-900"
              value="Guardar Cambios"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
