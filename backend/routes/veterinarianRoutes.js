import express from "express";
import {
  register,
  perfil,
  readToken,
  auth,
  forgotPassword,
  authToken,
  newPassword,
} from "../controllers/veterinarianController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//El callback (req,=> lo que se manda, res => la respuesta) se manda llamar automaticamente al llamar la ruta
//*** PUBLIC ACCOUNTS****
router.post("/", register);
//Adding a dynamic parameter
//We need to send the token in order to be readble
router.get("/readToken/:token", readToken);
router.post("/login", auth);
//Routing when the user forgot password
router.post("/forgotPassword", forgotPassword);
//User is going to recieve a token (read it from the URL)
router.get("/forgotPassword/:token", authToken);
//POST in order the user add the new password
router.post("/forgotPassword/:token", newPassword);
//router.route("/forgotPassword/:token").get(authToken).post(newPassword); =>The same as two lines above

//****  PRIVATE ACCOUNTS **** with Custom middleware
//Once perfil is visited, then open the function (executes their function),
// and then next goes to perfil
router.get("/perfil", authMiddleware, perfil);

export default router;
