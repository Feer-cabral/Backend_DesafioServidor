const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager("./src/models/products.json");
const ProductModel = require("../models/product.model.js");

router.get("/", async (req, res) => {
  try {
    let { limit = 10, page = 1, sort, query } = req.query;

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
      populate: "category",
    };

    let filter = {};
    if (query) {
      filter = { category: query };
    }

    // const products = await productManager.getProducts(options, filter);

    const products = await ProductModel.paginate(filter, options);

    const productosResultadoFinal = products.docs.map((p) => {
      const { _id, ...rest } = p.toObject();
      return rest;
    });

    const respuesta = {
      status: "success",
      payload: productosResultadoFinal,
      totalPages: products.totalPages,
      prevPage: products.hasPrevPage ? page - 1 : null,
      nextPage: products.hasNextPage ? page + 1 : null,
      page: page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage
        ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}`
        : null,
      nextLink: products.hasNextPage
        ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}`
        : null,
    };

    res.json(respuesta);
  } catch (error) {
    console.error("Error al obtener productos", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.get("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    const producto = await productManager.getProductById(id);

    if (!producto) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.render("product-details", { product: producto });
  } catch (error) {
    console.error("Error al obtener producto", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.post("/", async (req, res) => {
  const nuevoProducto = req.body;

  try {
    const producto = new ProductModel(nuevoProducto);
    await producto.save();

    res.status(201).json({ message: "Producto agregado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const nuevoProducto = req.body;

  try {
    const productoActualizado = await ProductModel.findByIdAndUpdate(
      id,
      nuevoProducto,
      { new: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.json({
      message: "Producto actualizado exitosamente",
      producto: productoActualizado,
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    const producto = await ProductModel.findByIdAndDelete(id);

    if (!producto) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.json({
      message: "Producto eliminado exitosamente",
      producto,
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
