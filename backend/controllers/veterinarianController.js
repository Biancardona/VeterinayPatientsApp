import Veterinarian from "../models/Veterinarian.js";

//Register a user
const register = async (req, res) => {
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
  console.log(req.body);
  //Applying destructuring to email and password
  // const { name, email, password } = req.body;
};

//
const perfil = (req, res) => {
  res.json({ msg: "Mostrando perfil" });
};
export { register, perfil };
