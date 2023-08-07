import mongoose from "mongoose";

//Define the schema (structure that the db is going to have) ot the DB for the patients
const patientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true, //Validation in the DB
    },
    propietario: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true, //Validation in the DB
      default: Date.now(),
    },
    sintomas: {
      type: String,
      required: true, //Validation in the DB
    },
    //Instancia de schema veterinarian
    veterinario: {
      type: mongoose.Schema.Types.ObjectId, //Relacion paciente con el veterinario que lo registre
      ref: "Veterinarian", //REferencia al modelo veterinarian
    },
  },
  {
    timestamps: true, //Create columns Edite
  }
);

//Register as a model that has to interact with the DB, as a second argument is the schema that is telling how needs to be the schema in the db
const Patients = mongoose.model("Patients", patientSchema);

export default Patients;
