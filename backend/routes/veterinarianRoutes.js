import express from "express";
import {
  register,
  perfil,
  readToken,
} from "../controllers/veterinarianController.js";

const router = express.Router();

//El callback (req,=> lo que se manda, res => la respuesta) se manda llamar automaticamente al llamar la ruta

router.post("/", register);

//Adding a dynamic parameter
//We need to send the token in order to be readble
router.get("/readToken/:token", readToken);

router.get("/perfil", perfil);

export default router;
