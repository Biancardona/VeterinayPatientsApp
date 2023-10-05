import AdminNav from "../components/AdminNav";

const ProfileChangePassword = () => {
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">
        Cambiar Password
      </h2>
      <p className="text-xl mb-10 mt-10 text-center">
        Modifica tu <span className="text-indigo-500 font-bold">Password </span>
      </p>
    </>
  );
};

export default ProfileChangePassword;
