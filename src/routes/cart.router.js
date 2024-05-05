import express from "express";
const router = express.Router();
import CartManager from "../controllers/cart.manager.js";
const cartManager = new CartManager();
import { CartModel } from "../models/cart.model.js";

router.post("/", async (req, res) => {
  try {
    const carrito = await cartManager.crearCarrito();

    console.log("El carrito se ha creado con exito");
    res.send(carrito);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const carrito = await CartModel.findById(cartId)
      .lean()
      .populate("products.product")
      .exec();

    if (!carrito) {
      res.status(404).json({ error: "Carrito no encontrado" });
    }

    res.render("cart", { carrito });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
    console.log(error);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    const carrito = await cartManager.agregarProductoAlCarrito(
      cartId,
      productId,
      quantity
    );

    console.log("El producto se agrego al carrito");
    res.send(carrito);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const carrito = await cartManager.eliminarProductoDelCarrito(
      cartId,
      productId
    );

    console.log("El producto se ha eliminado del carrito");
    res.json(carrito.products);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = req.body.products;

    const carritoActualizado = await cartManager.actualizarCarrito(
      cartId,
      products
    );

    console.log("Se ha actualizado el carrito");
    res.send(carritoActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    const carritoActualizado = await cartManager.actualizarCantidad(
      cartId,
      productId,
      quantity
    );

    console.log("Se ha actualizado el carrito");
    res.send(carritoActualizado.products);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
    console.log(error);
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;

    const carritoVaciado = await cartManager.vaciarCarrito(cartId);

    console.log("Se ha vaciado el carrito");
    res.send(carritoVaciado.products);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
