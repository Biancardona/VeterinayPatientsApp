import mongoose from "mongoose";

//Here we are going to connect the DB

const conectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      //Pasar objeto de configuracion
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //URL y PORT donde se esta conectando
    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(`mongoDB conectado en: ${url} `);
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
};

export default conectDB;
