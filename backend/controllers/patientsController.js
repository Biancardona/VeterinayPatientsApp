import Patients from "../models/Patients.js";

const addPatients = async (req, res) => {
  //Register a new patient
  //Create an instance of patients
  const patient = new Patients(req.body);
  //to get patient Id
  //veterinario is the name in the patient schema that bring the veterinarian info id
  //req.veterinarian es donde se alamcena los datos del authMiddleware
  patient.veterinario = req.veterinarian._id;

  try {
    //saving the object of patients
    const patientObject = await patient.save();
    res.json(patientObject);
  } catch (error) {
    console.log(error);
  }
};

const getPatients = async (req, res) => {
  //filter the patients of the veterinarian that has been logged
  const patients = await Patients.find()
    .where("veterinario")
    .equals(req.veterinarian);
  res.json(patients);
};

const getSinglePatient = async (req, res) => {
  //Bring patient instance

  const { id } = req.params;
  const patientsById = await Patients.findById(id);
  //authentication if the veterinarian add the patient
  //compare the id in patient and in veterinarian db
  //When in mongo DB the objectID are being compare, they need to be converted
  //to strings

  if (!patientsById) {
    const error = new Error("usuario no existe");
    return res.status(404).json({ msg: error.message });
  }
  if (
    patientsById.veterinario._id.toString() !== req.veterinarian._id.toString()
  ) {
    return res.json({ msg: "Paciente no valido" });
  }
  if (patientsById) {
    res.json(patientsById);
  }
};

const updatePatient = async (req, res) => {
  const { id } = req.params;

  const patientsById = await Patients.findById(id);
  if (!patientsById) {
    const error = new Error("usuario no existe");
    res.status(404).json({ msg: error.message });
  }
  if (
    patientsById.veterinario._id.toString() !== req.veterinarian._id.toString()
  ) {
    return res.json({ msg: "Paciente no valido" });
  }

  //Update patient
  //Need to read the information in the json and update the information
  //If there's no change , keep the original information
  //req.body is an object instance
  patientsById.name = req.body.name || patientsById.name;
  patientsById.propietario = req.body.propietario || patientsById.propietario;
  patientsById.email = req.body.email || patientsById.email;
  patientsById.date = req.body.date || patientsById.date;
  patientsById.sintomas = req.body.sintomas || patientsById.sintomas;
  try {
    const patientObject = await patientsById.save();
    res.json(patientObject);
  } catch (error) {
    console.log(error);
  }
};
const deletePatient = async (req, res) => {
  const { id } = req.params;

  const patientsById = await Patients.findById(id);
  if (!patientsById) {
    const error = new Error("usuario no existe");
    res.status(404).json({ msg: error.message });
  }
  if (
    patientsById.veterinario._id.toString() !== req.veterinarian._id.toString()
  ) {
    return res.json({ msg: "Paciente no valido" });
  }
  //DELETE A PATIENT
  //Using mongoose method

  try {
    await patientsById.deleteOne();
    return res.json({ msg: "Paciente eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export {
  addPatients,
  getPatients,
  getSinglePatient,
  updatePatient,
  deletePatient,
};
