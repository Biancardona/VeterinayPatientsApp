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

const readToken = async (req, res) => {
  //para leer datos req.params
  //luego añadir el parametro dinamico que se añadio en el routing, en este caso es token
  console.log(req.params.token);

  //   const { token } = req.body;
  //   const tokenExist = await Veterinarian.findOne({ token });

  res.send({ msg: "Mostrando perfil" });
};

export { register, perfil, readToken };
