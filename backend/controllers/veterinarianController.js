import Veterinarian from "../models/Veterinarian.js";

//Register a user
const register = async (req, res) => {
  //Applying destructuring to email and password
  //Para llenar formulario req.body
  const { name, email, password } = req.body;
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
    res.json(veterinarianObject);
  } catch (error) {
    console.log(error);
  }
  //Rest.send envia la info dentro de ( ) al navegador
  //Request lo que se envia al servidor
};

//
const perfil = (req, res) => {
  res.send({ msg: "Mostrando perfil" });
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
    const error = new Error("usuario no existe");
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
  //authentication of the user
  if (emailExist.comparedPasswords(password)) {
    console.log("usuario autenticado");
  } else {
    const error = new Error("password no coincide ");
    return res.status(403).json({ msg: error.message });
  }
};

export { register, perfil, readToken, auth };
