import express from "express";
import {
  register,
  perfil,
  readToken,
  auth,
} from "../controllers/veterinarianController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//El callback (req,=> lo que se manda, res => la respuesta) se manda llamar automaticamente al llamar la ruta
//PUBLIC ACCOUNTS
router.post("/", register);
//Adding a dynamic parameter
//We need to send the token in order to be readble
router.get("/readToken/:token", readToken);

router.post("/login", auth);

//PRIVATE ACCOUNTS with Custom middleware

//Once perfil is visited, then open the function (executes their function),
// and then next goes to perfil
router.get("/perfil", authMiddleware, perfil);

export default router;
