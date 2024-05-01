const express = require("express");
const router = express.Router();
const CartManager = require("../controllers/cart-manager.js");
const cartManager = new CartManager("./src/models/carts.json");

router.post("/", async (req, res) => {
  try {
    const nuevoCarrito = await cartManager.crearCarrito();
    res.json(nuevoCarrito);
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const carrito = await cartManager.getCarritoById(cartId);

    if (!carrito) {
      return res.status(404).json({
        error: "Carrito no encontrado",
      });
    }

    res.json(carrito);
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const actualizarCarrito = await cartManager.agregarProductoAlCarrito(
      cartId,
      productId,
      quantity
    );
    res.json(actualizarCarrito.products);
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    const carritoActualizado = await cartManager.eliminarProductoDelCarrito(
      cartId,
      productId
    );

    res.json(carritoActualizado.products);
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.put("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const products = req.body.products;

  try {
    const carritoActualizado = await cartManager.actualizarCarrito(
      cartId,
      products
    );

    res.json(carritoActualizado.products);
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.put("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity;

  try {
    const carritoActualizado = await cartManager.actualizarCantidad(
      cartId,
      productId,
      quantity
    );

    res.json(carritoActualizado.products);
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.delete("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
    const carritoActualizado = await cartManager.vaciarCarrito(cartId);

    res.json(carritoActualizado.products);
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

module.exports = router;
