const express = require("express");
const app = express();
const PUERTO = 8080;
const handlebars = require("express-handlebars");
const socket = require("socket.io");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
require("./database.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const server = app.listen(PUERTO, () => {
  console.log(`Escuchando en el http://localhost:${PUERTO}`);
});

const MessagesModel = require("./models/message.model.js");
const io = new socket.Server(server);

io.on("connection", (socket) => {
  console.log("Se ha conectado un usuario");

  socket.on("message", async (data) => {
    await MessagesModel.create(data);

    const messages = await MessagesModel.find();
    console.log(messages);
    io.sockets.emit("message", messages);
  });
});
