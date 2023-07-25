import mongoose from "mongoose";

//Define the schema (structure that the db is going to have) ot the DB
const veterinarianSchema = mongoose.Schema({
  name: {
    type: String,
    required: true, //Validation in the DB
    trim: true, //Delete white spaces
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, //Only one email per user
    trim: true,
  },
  telephone: {
    type: String,
    default: null, //Is not mandatory
    trim: true,
  },
  web: {
    type: String,
    default: null,
  },
  token: {
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false, //change to true when the users confirm their email
  },
});

//Register as a model that has to interact with the DB, as a second argument is the schema that is telling how needs to be the schema in the db
const Veterinarian = mongoose.model("Veterinarian", veterinarianSchema);

export default Veterinarian;
