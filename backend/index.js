import express from "express";
import dotenv from "dotenv";
import conectDB from "./config/db.js";
import veterinarianRoutes from "./routes/veterinarianRoutes.js";

//Call to execute express
const app = express();

//Tell it that we are going to post (send) data throught JSON form
app.use(express.json());
//Dotenv must be before conectDB
dotenv.config();
//process.env => es la manera como node oculta las variables, se ponen en el archivo .env y se ocultan en el gitignore

//Call the function that connect to DB
conectDB();

//Cuando se escriba la url api/veteri... se va a mandar llamar la ruta veterinarianRoutes que esta importada de routes
app.use("/api/veterinarians", veterinarianRoutes);
//Defining PORT
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Servidor funcionando en el puerto 4000");
});
