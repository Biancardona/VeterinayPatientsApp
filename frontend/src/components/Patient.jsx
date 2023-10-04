import usePatient from "../hooks/usePatient";

const Patient = ({ patientProp }) => {
  const { getToEdit, deletePatient } = usePatient();

  //applying destructuring to extract all the info from patientProp object
  const { name, propietario, email, date, sintomas, _id } = patientProp;
  console.log(patientProp);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(
      newDate
    );
  };

  return (
    <div className="mx-5 my-5 bg-white shadow-md py-5 px-5 rounded-xl ">
      <p className="uppercase font-bold text-indigo-900 my-1">
        Nombre:{" "}
        <span className="font-normal normal-case text-black"> {name}</span>
      </p>
      <p className="uppercase font-bold text-indigo-900 my-1">
        Propietario:
        <span className="font-normal normal-case text-black">
          {" "}
          {propietario}
        </span>
      </p>
      <p className="uppercase font-bold text-indigo-900 my-1">
        Email:
        <span className="font-normal normal-case text-black"> {email}</span>
      </p>
      <p className="uppercase font-bold text-indigo-900 my-1">
        Date:
        <span className="font-normal normal-case text-black">
          {" "}
          {formatDate(date)}
        </span>
      </p>
      <p className="uppercase font-bold text-indigo-900 my-1">
        Sintomas:
        <span className="font-normal normal-case text-black"> {sintomas}</span>
      </p>
      <div className="flex justify-between mt-3">
        {" "}
        <button
          className="flex select-none items-center gap-3 rounded-lg border border-indigo-500 py-1 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-indigo-500 transition-all hover:opacity-75 focus:ring focus:ring-indigo-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="submit"
          data-ripple-dark="true"
          onClick={() => getToEdit(patientProp)}
        >
          Edit
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>{" "}
        <button
          className="flex select-none items-center gap-3 rounded-lg border border-pink-500 py-2 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-ripple-dark="true"
          onClick={() => deletePatient(_id)}
        >
          Delete
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>{" "}
      </div>
    </div>
  );
};

export default Patient;
