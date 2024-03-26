const express = require("express");
const app = express();
const PUERTO = 8080;
const handlebars = require("express-handlebars");
const socket = require("socket.io");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api", productsRouter);
app.use("/api", cartsRouter);
app.use("/", viewsRouter);

const server = app.listen(PUERTO, () => {
  console.log(`Escuchando en el http://localhost:${PUERTO}`);
});

const io = socket(server);

const ProductManager = require("./controllers/product-manager.js");
const productManager = new ProductManager("./src/models/productos.json");

io.on("connection", async (socket) => {
  console.log("Se ha conectado un cliente");

  socket.emit("productos", await productManager.getProducts());

  socket.on("eliminarProducto", async (id) => {
    await productManager.deleteProduct(id);
    socket.emit("productos", await productManager.getProducts());
  });

  socket.on("agregarProducto", async (producto) => {
    await productManager.addProduct(producto);
    socket.emit("productos", await productManager.getProducts());
  });
});
