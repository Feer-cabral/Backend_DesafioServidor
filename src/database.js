const mongoose = require("mongoose");
const configObject = require("./config/config.js");
const { mongo_url } = configObject;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Conectado a mongoDB");
  })
  .catch((error) => {
    console.log("Error al conectarse a mongoDB", error);
  });
