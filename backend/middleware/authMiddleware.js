import jwt from "jsonwebtoken";
import Veterinarian from "../models/Veterinarian.js";

const authMiddleware = async (req, res, next) => {
  //Identify who is the user that is authenticated to show them their perfil
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //Check if the token is valid

    try {
      //jwt does not require the baerer key word
      //.split = separa el token
      //asigna el token en la posicion 1 para que no incluya el espacio despues de baerer
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
      //In jwt page in Decoded we already have access to the data
      //using verify method take as parameter the token that is created when we authenticate the user
      //and the second parameter the secret word

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      //If the token is verify, then..
      //searching for the user
      //.select para que no traiga el password
      //.req para iniciar sesion de veterinarian
      //  (almacenando los datos de veterinarian existente en controller) en express
      req.veterinarian = await Veterinarian.findById(decoded.id).select(
        "-password -token -confirmado"
      );

      return next();
    } catch (error) {
      const e = new Error("Token no valido ");
      res.status(403).json({ msg: e.message });
    }
  }
  if (!token) {
    const error = new Error("Token no valido o inexistente ");
    res.status(404).json({ msg: error.message });
  }

  next();
};

export default authMiddleware;
