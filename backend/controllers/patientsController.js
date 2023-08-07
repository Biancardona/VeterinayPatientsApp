import Patients from "../models/Patients.js";

const addPatients = async (req, res) => {
  //Register a new patient
  //Create an instance of patients
  const patient = new Patients(req.body);
  //to get patient Id
  //veterinario is the name in the patient schema that bring the veterinarian info id
  //req.veterinarian es donde se alamcena los datos del authMiddleware
  patient.veterinario = req.veterinarian._id;

  const { name, propietario, email, sintomas } = req.body;
  try {
    //saving the object of patients
    const patientObject = await patient.save();
    res.json(patientObject);
  } catch (error) {
    console.log(error);
  }
};

const getPatients = (req, res) => {};

export { addPatients, getPatients };
