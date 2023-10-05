import AdminNav from "../components/AdminNav";

const EditProfile = () => {
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mb-10 mt-10 text-center">
        Modifica tus <span className="text-indigo-500 font-bold">Datos </span>
      </p>
    </>
  );
};

export default EditProfile;
