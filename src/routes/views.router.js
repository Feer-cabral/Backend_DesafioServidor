const express = require("express");
const router = express.Router();
const ProductModel = require("../models/product.model.js");

router.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find().limit(10).exec();
    res.render("products", { products });
  } catch (error) {
    console.error("Error al cargar los productos", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId).exec();
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.render("product-details", { product });
  } catch (error) {
    console.error("Error al cargar el detalle del producto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/carts/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await fetchCartData(cartId);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.render("cart-details", { cart });
  } catch (error) {
    console.error("Error al cargar el detalle del carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
