import mongoose from "mongoose";
import bcrypt from "bcrypt";
import idGenerator from "../helpers/idGenerator.js";

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
    default: idGenerator(),
  },
  confirmed: {
    type: Boolean,
    default: false, //change to true when the users confirm their email
  },
});

//Before the password is saved in the db, it's going to be hashed
//.pre is a "hook" in moongoseDB and means antes de
veterinarianSchema.pre("save", async function (next) {
  //we can use .this here no make reference to the object
  console.log(this);

  //Won't hash a password again if is already hashed
  if (!this.isModified("password")) {
    next();
  }
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

//Register as a model that has to interact with the DB, as a second argument is the schema that is telling how needs to be the schema in the db
const Veterinarian = mongoose.model("Veterinarian", veterinarianSchema);

export default Veterinarian;
