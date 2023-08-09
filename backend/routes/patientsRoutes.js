import express from "express";
const router = express.Router();
import {
  addPatients,
  getPatients,
  getSinglePatient,
  updatePatient,
  deletePatient,
} from "../controllers/patientsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

router
  .route("/") //Homepage
  //Veterinarian needs to be authenticated to start register their patients
  //Also needs to be authenticated to get any patient information
  //For that reason qe need to add a middleware in postPAtient to protect that route

  .post(authMiddleware, addPatients)
  .get(authMiddleware, getPatients);

router
  .route("/:id")
  .get(authMiddleware, getSinglePatient)
  .put(authMiddleware, updatePatient)
  .delete(authMiddleware, deletePatient);

export default router;
