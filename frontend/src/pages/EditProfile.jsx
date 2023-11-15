import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alert from "../components/Alert";

const EditProfile = () => {
  //No cambiar el state original hasta que no se hayan almacenado los cambios(usar useEffect)
  // setting the value of the input field to the property of the profile object, ejem => value={profile.email} .
  //{...profile} is creating a shallow copy of the existing "profile" object to ensure that the original "profile" object remains unaltered,
  //and you're working with a new object
  //[e.target.name] is using the name property of the e.target element to access the name property of the input field.
  //e.target.value retrieves the new value entered by the user in the input field

  const { auth, editProfile } = useAuth();
  const [profile, setProfile] = useState({});
  const [alert, setAlerta] = useState({});
  const { msg } = alert;

  useEffect(() => {
    setProfile(auth);
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Destructuring to extract name and email and be able to use them as an array
    const { name, email } = profile;
    if ([name, email].includes("")) {
      setAlerta({ msg: "Campo vacio, intenta de nuevo", error: true });
      return;
    }
    //Blocking the code excecution of the alert untl this editProfile state finish their status , their responses
    const resultEditProfile = await editProfile(profile);
    //The response of setAlert comes from the authProvider response
    setAlerta(resultEditProfile);
  };

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mb-10 mt-10 text-center">
        Modifica tus <span className="text-indigo-500 font-bold">Datos </span>
      </p>
      <div className="flex justify-center ">
        <div className="w-full bg-white shadow p-5">
          {msg && <Alert alert={alert} />}
          <form onSubmit={handleSubmit}>
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
                name="web"
                value={profile.web || ""}
                onChange={(e) =>
                  setProfile({ ...profile, [e.target.name]: e.target.value })
                }
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
                  setProfile({ ...profile, [e.target.name]: e.target.value })
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
                name="telephone"
                value={profile.telephone || ""}
                onChange={(e) =>
                  setProfile({ ...profile, [e.target.name]: e.target.value })
                }
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
