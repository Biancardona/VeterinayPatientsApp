//CUSTOM HOOK FOR PATIENTS

//Context its going to extract all the info (state) from the AuthContext
import { useContext } from "react";
import PatientsContext from "../context/PatientsProvider";

//UseContext is going to make available the values of the provider(PatientContext)
const usePatient = () => {
  return useContext(PatientsContext);
};

export default usePatient;
