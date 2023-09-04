import Veterinarian from "../models/Veterinarian.js";
import generateJWT from "../helpers/generateJWT.js";
import idGenerator from "../helpers/idGenerator.js";
import emailRegister from "../helpers/emailRegister.js";
import emailForgotPassword from "../helpers/forgotPassword.js";

//Register a user
const register = async (req, res) => {
  //Applying destructuring to email and password
  //Para leer del inputo la info del formulario req.body
  const { name, email } = req.body;
  const userEmailExist = await Veterinarian.findOne({ email: email });

  if (userEmailExist) {
    //Create a new instance of an error to send everytime an error exist
    const error = new Error("Email duplicado");
    //Stop the execution and send the error message in the DB response
    return res.status(400).json({ msg: error.message });
  }

  try {
    //Register a new veterinarian
    //Creating a new instance of Veterinarian that is going to have all that schema
    const veterinarian = new Veterinarian(req.body);
    //Create another instance or object using save()method.
    const veterinarianObject = await veterinarian.save();
    //Send email Register; passing name, email, and token

    emailRegister({
      name,
      email,
      token: veterinarianObject.token,
    });
    res.json(veterinarianObject);
  } catch (error) {
    console.log(error);
  }
  //Rest.send envia la info dentro de ( ) al navegador
  //Request lo que se envia al servidor
};

//
const perfil = (req, res) => {
  //req.veterinario esta almacenado en el authMiddleware(info almacenada en la sesion del servidor)
  const { veterinarian } = req;
  res.json({ perfil: veterinarian });
};

//When user creates their account, an email with the token number would be send to the user so they can confirm their account
const readToken = async (req, res) => {
  //para leer datos req.params
  //luego añadir el parametro dinamico que se añadio en el routing, en este caso es token
  // console.log(req.params.token);

  const { token } = req.params;
  const tokenExist = await Veterinarian.findOne({ token });
  console.log(tokenExist);

  if (!tokenExist) {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    //If token exist, then user is confirm, in tokenExist instance change token to null, and confirmado to true.
    //Then save the instance ot tokenExist
    tokenExist.token = null;
    tokenExist.confirmed = true;
    await tokenExist.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const auth = async (req, res) => {
  console.log(req.body);
  //
  const { email, password } = req.body;
  const emailExist = await Veterinarian.findOne({ email });

  if (!emailExist) {
    const error = new Error("correo no existe");
    return res.status(403).json({ msg: error.message });
  }
  //check if the email is confirmed
  if (!emailExist.confirmed) {
    const error = new Error("correo no autenticado");
    return res.status(403).json({ msg: error.message });
  }
  //authentication of the password.Using the function that is in the schema to compare passwords
  if (await emailExist.comparedPasswords(password)) {
    //authentication of the user(using the function generateJWT); passing the user id in order to generate
    //the token with the user id
    res.json({ token: generateJWT(emailExist.id) });
  } else {
    const error = new Error("password no coincide ");
    return res.status(403).json({ msg: error.message });
  }
};

//In case the email exist
//1.- Generate a token
//2.- Send through mail
//3.- When the user open the link, we are going to search in the db if the token exists
//4.- Allow to the user generate new password
const forgotPassword = async (req, res) => {
  const { email, name } = req.body;
  const emailExist = await Veterinarian.findOne({ email });

  if (!emailExist) {
    const error = new Error("correo no existe");
    return res.status(403).json({ msg: error.message });
  }
  try {
    //generate ID
    emailExist.token = idGenerator();
    //save it in the DB
    await emailExist.save();

    //Send email with instructions (MAILTRAP)
    emailForgotPassword({
      name: emailExist.name,
      email,
      token: emailExist.token,
    });
    //res.json send a message
    res.json({ msg: "Token generado correctamente" });
  } catch (error) {}
};

const authToken = async (req, res) => {
  //Because is info from de url (req.params)
  //Because the route have a dynamic param (/:token), the way to access that info is request.params
  const { token } = req.params;

  const tokenExist = await Veterinarian.findOne({ token });
  console.log(tokenExist);
  if (tokenExist) {
    res.json({ msg: "Token  valido" });
  } else {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  //Read the token to continue validating it (info from the url req.params)
  const { token } = req.params;
  const veterinarian = await Veterinarian.findOne({ token });
  console.log(veterinarian);
  //Read the password (req.body => read the info that the user writes in the inputs)
  const { password } = req.body;

  if (!veterinarian) {
    const error = new Error("usuario no existee");
    return res.status(404).json({ msg: error.message });
  }

  //If is a valid token use a try catch because db its going to be modified (POST) bc a new password its going to be added
  try {
    //Delete the token (null)
    //Re asign the password and save it
    veterinarian.token = null;
    veterinarian.password = password;
    await veterinarian.save();
    res.json({ msg: "Contraseña añadida correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export {
  register,
  perfil,
  readToken,
  auth,
  forgotPassword,
  authToken,
  newPassword,
};
