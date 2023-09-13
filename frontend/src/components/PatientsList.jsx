import usePatient from "../hooks/usePatient";
import Patient from "./Patient";

const PatientsList = () => {
  const { patients } = usePatient();

  return (
    <>
      {patients.length ? (
        <>
          {" "}
          <h2 className="text-3xl font-bold text-center">
            Listado de pacientes
          </h2>{" "}
          <p className="text-xl text-center mt-5 mb-10">
            Administra tus{" "}
            <spam className="text-indigo-600">Pacientes y Citas </spam>{" "}
          </p>
          {patients.map((option) => (
            <Patient key={option._id} patientProp={option} />
          ))}
        </>
      ) : (
        <>
          {" "}
          <h2 className="text-3xl font-bold text-center">
            No hay pacientes
          </h2>{" "}
          <p className="text-xl text-center mt-5 mb-10">
            Comienza agregando tus{" "}
            <spam className="text-indigo-600">pacientes </spam>{" "}
          </p>
        </>
      )}{" "}
    </>
  );
};

export default PatientsList;
