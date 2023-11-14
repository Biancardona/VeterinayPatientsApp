import { useEffect } from "react";
import { createContext, useState } from "react";
import axiosClient from "../config/axios";

//Crear una variable que almacene o cree el CreateContext
const AuthContext = createContext();
//Create a function o component father that it's going to wrap all the others apps
//Que retorne el context y el provider

//Inside the provider is going to be all the children components
//VALUE is a prop required in the AuthContext
//Pasandole un objeto con todos los valores que van estar disponibles cuando se llame el custom Hook
//auth, setAuth para que ese state este disponible en el context
const AuthProvider = ({ children }) => {
  //If the object has information, means the user is autenticated
  const [auth, setAuth] = useState({});
  //Add another state, que estara disponible para arreglar el estado del objeto al iniciar sesion(porque siempre lo marca false)
  const [load, setLoad] = useState(true);
  //Once the app is loaded, useEffect going to corroborate if the user is autenticated
  useEffect(() => {
    const userAuthenticate = async () => {
      //Bring token from localStorage(key and value)
      const token = localStorage.getItem("token");

      //if token doesn't exist, stop running
      if (!token) {
        setLoad(false);
        return;
      }
      //Adding configuration header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axiosClient("/veterinarians/perfil", config);
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }
      setLoad(false);
    };
    userAuthenticate();
  }, []);

  const signOut = () => {
    //Delete the token
    localStorage.removeItem("token");
    //Object information empty
    setAuth({});
  };

  const editProfile = async (datos) => {
    const token = localStorage.getItem("token");

    //if token doesn't exist, stop running
    if (!token) {
      setLoad(false);
      return;
    }
    //Adding configuration header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const editMessage = confirm("Dese guardar los cambios efectuados?");
    if (editMessage) {
      try {
        const { data } = await axiosClient.put(
          `/veterinarians/perfil/${datos._id}, ${datos}, config`
        );
        console.log(data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, load, signOut, editProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };
export default AuthContext;
