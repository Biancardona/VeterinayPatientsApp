import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav
      className="flex gap-3
    "
    >
      <Link className="text-gray-500 uppercase font-bold" to="/admin/profile">
        {" "}
        Perfil{" "}
      </Link>
      <Link
        className="text-gray-500 uppercase font-bold"
        to="/admin/change-password"
      >
        {" "}
        Cambiar Password{" "}
      </Link>
    </nav>
  );
};

export default AdminNav;
