import express from "express";
const router = express.Router();
import { addPatients, getPatients } from "../controllers/patientsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

router
  .route("/") //Homepage
  //Veterinarian needs to be authenticated to start register their patients
  //Also needs to be authenticated to get any patient information
  //For that reason qe need to add a middleware in postPAtient to protect that route

  .post(authMiddleware, addPatients)
  .get(getPatients);

export default router;
