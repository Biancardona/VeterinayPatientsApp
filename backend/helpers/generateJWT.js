import jwt from "jsonwebtoken";

const generateJWT = (id) => {
  //object with the information that is going to be added to the new JsonWebToken
  //then the environment variable
  //then some configurations( expired date)
  //The objectr it's going to generate the JWT with the user id
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateJWT;
