import express from "express";
import dotenv from "dotenv";
import conectDB from "./config/db.js";

//Call to execute express
const app = express();
//Dotenv must be before conectDB
dotenv.config();
//process.env => es la manera como node oculta las variables, se ponen en el archivo .env y se ocultan en el gitignore

//Call the function that connect to DB
conectDB();

app.use("/", (req, res) => {
  res.send("Hola Mundo");
});
//Defining PORT
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Servidor funcionando en el puerto 4000");
});
