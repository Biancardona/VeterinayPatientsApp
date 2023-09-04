import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import ProtectedLayout from "./layout/ProtectedLayout";
import AccountConfirm from "./pages/AccountConfirm";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/AdminPatients";
import { AuthProvider } from "./context/AuthProvider";

//Browser router es el wraper
//Router agrupa diferentes rutas
//Route para una ruta especifica
//Login is the main page that is going to use the / route
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password/" element={<ForgotPassword />} />
            <Route path="forgot-password/:token" element={<NewPassword />} />
            <Route path="confirmed/:id" element={<AccountConfirm />} />
          </Route>
          <Route path="/admin" element={ProtectedLayout}>
            <Route index element={<Admin />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
