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
        //Almacenando en updatedPAtient un nuevo array de la iteracion del array patients,
        //For each element in patientState in the patients Array checks if the _id property of patientState is equal
        //to the _id of data
        //This comparison is likely used to identify a specific patient within the array.
        //If the id's matches, means that you want to update this specific patient's data
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
        delete patient.id;
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
  };
  //Ya se iteraron los datos, con el nuevo state del paciente en singular se trae el objeto
  const getToEdit = (patient) => {
    setPatient(patient);
  };

  const deletePatient = async (id) => {
    const deleteMessage = confirm("Desea eliminar Paciente?");
    if (deleteMessage) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axiosClient.delete(`/patients/${id}`, config);
        const updatedPatient = patients.filter((elem) => elem._id !== id);
        setPatients(updatedPatient);
        console.log(data);
      } catch (error) {
        console.log(error.respo.data);
      }
    }
  };

  return (
    <PatientsContext.Provider
      value={{
        patients,
        setPatients,
        savePatient,
        getToEdit,
        patient,
        deletePatient,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};
export { PatientsProvider };
export default PatientsContext;
