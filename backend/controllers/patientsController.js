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
  if (
    patientsById.veterinario._id.toString() !== req.veterinarian._id.toString()
  ) {
    return res.json({ msg: "Paciente no valido" });
  } else {
    res.json(patientsById);
  }
};

export { addPatients, getPatients, getSinglePatient };
