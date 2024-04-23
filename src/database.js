const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Feer:coderalumno@cluster0.hjihbeg.mongodb.net/E_commerce?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log("Error al conectar a la BD", error));
