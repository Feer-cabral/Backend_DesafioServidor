import express from "express";
const router = express.Router();
import ProductManager from "../controllers/product.manager.js";
const productManager = new ProductManager();
import ProductModel from "../models/product.model.js";

router.get("/", async (req, res) => {
  try {
    let { limit, page, sort, query } = req.query;

    let options = {
      limit: limit ? parseInt(limit) : 10,
      page: page ? parseInt(page) : 1,
      sort: sort
        ? { price: sort === "asc" ? 1 : sort === "desc" ? -1 : 1 }
        : {},
      populate: "category",
    };

    let filter = {};
    if (query) {
      filter.category = query;
    }

    const products = await ProductModel.paginate(filter, options);

    const productosResultados = products.docs.map((p) => {
      const { _id, ...rest } = p.toObject();
      return rest;
    });

    res.render("products", {
      status: "success" || "error",
      products: productosResultados,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      currentPage: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.prevLink,
      nextLink: products.nextLink,
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    let productId = req.params.pid;

    const product = await productManager.getProductById(productId);
    res.send(product);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;

    const newProduct = await productManager.agregarProducto(product);
    res.send(newProduct);
    console.log("Producto agregado con exito");
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const updatedProduct = req.body;

    const product = await productManager.actualizarProducto(
      productId,
      updatedProduct
    );
    res.send(product);
    console.log("Producto actualizado con exito");
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;

    const product = await productManager.borrarProducto(productId);
    res.send(product);
    console.log("Producto eliminado con exito");
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;
