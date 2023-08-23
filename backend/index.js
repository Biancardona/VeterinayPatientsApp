import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectDB from "./config/db.js";
import veterinarianRoutes from "./routes/veterinarianRoutes.js";
import patientsRoutes from "./routes/patientsRoutes.js";

//Call to execute express
const app = express();

//Tell it that we are going to post (send) data throught JSON form
app.use(express.json());
//Dotenv must be before conectDB
dotenv.config();
//process.env => es la manera como node oculta las variables, se ponen en el archivo .env y se ocultan en el gitignore

//Call the function that connect to DB
conectDB();

//Allow cors using F.E. URL
const allowedDomains = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedDomains.indexOf(origin) !== -1) {
      //Request oorigin is allowed
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};
//Allow express use CorsOptions
app.use(cors(corsOptions));
//Cuando se escriba la url api/veteri... se va a mandar llamar la ruta veterinarianRoutes que esta importada de routes
app.use("/api/veterinarians", veterinarianRoutes);
app.use("/api/patients", patientsRoutes);
//Defining PORT
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Servidor funcionando en el puerto 4000");
});
