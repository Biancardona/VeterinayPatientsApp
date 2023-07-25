import express from "express";
import { register, perfil } from "../controllers/veterinarianController.js";

const router = express.Router();

//El callback (req,=> lo que se manda, res => la respuesta) se manda llamar automaticamente al llamar la ruta

router.get("/", register);

router.get("/perfil", perfil);

export default router;
