import { createContext } from "react";

//Crear una variable que almacene o cree el CreateContext
const AuthContext = createContext;
//Create a function o component father that it's going to wrap all the others apps
//Que retorne el context y el provider

//Inside the provider is going to be all the children components
const AuthProvider = ({ children }) => {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
export { AuthProvider };
export default AuthContext;
