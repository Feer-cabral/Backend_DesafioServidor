import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://Feer:coderalumno@cluster0.hjihbeg.mongodb.net/E_commerce?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Conectado a mongoDB");
  })
  .catch((error) => {
    console.log("Error al conectarse a mongoDB", error);
  });
