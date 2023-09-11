import { useState } from "react";
import Alert from "./Alert";
import axiosClient from "../config/axios";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [propietario, setPropietario] = useState("");
  const [date, setDate] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [alert, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, email, propietario, date, sintomas].includes("")) {
      setAlerta({ msg: "Campo vacio, intenta de nuevo" });
      return;
    }
    setAlerta({});

    try {
      //   await axiosClient.post("/patients", {
      //     name,
      //     email,
      //     propietario,
      //     date,
      //     sintomas,
      //   });
      setAlerta({
        msg: "Paciente creado correctamente",
        error: false,
      });
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };
  const { msg } = alert;

  return (
    <>
      <p className="font-black text-center mb-10">
        Administra tu Veterinaria y añade{" "}
        <spam className="text-indigo-600"> Pacientes </spam>
      </p>
      {msg && <Alert alert={alert} />}
      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-gray-700 font-bold uppercase">
            Nombre de la Mascota
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="text-gray-700 font-bold uppercase"
          >
            Nombre del Propietario
          </label>
          <input
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
            id="propietario"
            type="text"
            placeholder="Propietario de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 font-bold uppercase">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="text"
            placeholder="Email del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md hover:bg-indigo-700 transition-colors"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="date" className="text-gray-700 font-bold uppercase">
            Fecha Alta
          </label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            id="date"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="text-gray-700 font-bold uppercase"
          >
            Sintomas
          </label>
          <textarea
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
            id="sintomas"
            type="text"
            placeholder="Describe los sintomas"
            className="border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md"
          />

          <input
            type="submit"
            value="Añadir Paciente"
            className="border w-full p-3 mt-5 my-5 px-10 bg-indigo-600 text-white uppercase rounded-xl font-bold hover:cursor-pointer hover:bg-indigo-900"
          />
        </div>
      </form>
    </>
  );
};

export default Form;
