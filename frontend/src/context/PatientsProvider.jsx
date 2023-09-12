import { createContext, useState } from "react";
import axiosClient from "../config/axios";

const PatientsContext = createContext();

const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  const savePatient = async (patient) => {
    //Bring token from localStorage(key and value)
    const token = localStorage.getItem("token");
    console.log(patient);
    //Adding configuration header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    //Create context in order to have a global state for patients
    try {
      const { data } = await axiosClient.post("/patients", patient, config);
      //Se crea un nuevo objeto en ...savePatient omitiendo los tres primeros valores,
      const { createdAt, updatedAt, __v, ...savedPatient } = data;
      //Esto está copiando todos los elementos del array patients original después de savePatient en el nuevo array
      //Actualizando el estado de pacientes al agregar un nuevo paciente (savePatient)
      //al principio de la lista de pacientes existente(patients)
      //y manteniendo los pacientes anteriores en su lugar
      setPatients([savedPatient, ...patients]);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <PatientsContext.Provider value={{ patients, setPatients, savePatient }}>
      {children}
    </PatientsContext.Provider>
  );
};
export { PatientsProvider };
export default PatientsContext;
