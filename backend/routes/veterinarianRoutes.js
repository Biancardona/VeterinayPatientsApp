import express from "express";

const router = express.Router();

//El callback (req,=> lo que se manda, res => la respuesta) se manda llamar automaticamente al llamar la ruta

router.get("/", (req, res) => {
  res.send("Desde API/veterinarios");
});

router.get("/login", (req, res) => {
  res.send("Desde API/veterinarios");
});

export default router;
