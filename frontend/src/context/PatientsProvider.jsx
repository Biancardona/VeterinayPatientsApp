import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axios";
import useAuth from "../hooks/useAuth";

const PatientsContext = createContext();

const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});
  //Pasar el usuario como dependencia en el useEffecto para que solo muestre los pacientes del vet correspondiente
  const { auth } = useAuth();

  useEffect(() => {
    const getPatients = async () => {
      try {
        //Obtaining token because the vet's ID is saved there
        const token = localStorage.getItem("token");

        const configuration = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axiosClient("/patients", configuration);
        console.log(data);
        //Once we have the result its going to be in patient state
        setPatients(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPatients();
  }, [auth]);

  const savePatient = async (patient) => {
    const token = localStorage.getItem("token");
    //Adding configuration header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    //If the patient has id means that is and edition
    if (patient.id) {
      try {
        const { data } = await axiosClient.put(
          `/patients/${patient.id}`,
          patient,
          config
        );
        //iterando sobre el state, busca que coincida el id que se modifica
        //y el id de la respuesta(data) y reescribe todo el objeto
        const updatedPatient = patients.map((patientState) =>
          patientState._id === data._id ? data : patientState
        );
        setPatients(updatedPatient);
        console.log(data);
      } catch (error) {
        console.log(error.response.data);
      }
      console.log("editando");
    } else {
      try {
        //Create context in order to have a global state for patients
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
    }

    // else, is a new patient

    //Bring token from localStorage(key and value)
  };
  //Ya se iteraron los datos, con el nuevo state del paciente en singular se trae el objeto
  const getToEdit = (patient) => {
    setPatient(patient);
  };

  return (
    <PatientsContext.Provider
      value={{ patients, setPatients, savePatient, getToEdit, patient }}
    >
      {children}
    </PatientsContext.Provider>
  );
};
export { PatientsProvider };
export default PatientsContext;
