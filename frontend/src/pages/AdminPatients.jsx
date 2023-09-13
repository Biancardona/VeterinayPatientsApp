import { useState } from "react";
import Form from "../components/Form";
import PatientsList from "../components/PatientsList";

const Admin = () => {
  //Adding useState to control the render of the form
  const [showForm, setShowForm] = useState(true);
  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        className="mx-10 p-3 font-bold uppercase bg-indigo-500 text-white rounded-md mb-10 md:hidden"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Ocultar Formulario " : "Mostrar Formulario"}
      </button>
      <div
        className={`${
          showForm ? "block" : "hidden"
        } md:w-block md:w-1/2 lg:w-2/5`}
      >
        <Form />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        {" "}
        <PatientsList />
      </div>
    </div>
  );
};

export default Admin;
