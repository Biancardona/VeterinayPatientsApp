import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import AccountConfirm from "./pages/AccountConfirm";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
//Browser router es el wraper
//Router agrupa diferentes rutas
//Route para una ruta especifica
//Login is the main page that is going to use the / route
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="confirmed/:id" element={<AccountConfirm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
