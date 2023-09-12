import usePatient from "../hooks/usePatient";

const PatientsList = () => {
  const { patients } = usePatient();
  console.log(patients);

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
