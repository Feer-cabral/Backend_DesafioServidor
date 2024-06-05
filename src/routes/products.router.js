const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/product.manager.js");
const productManager = new ProductManager();

router.get("/", productManager.getProducts);
router.get("/:id", productManager.getProductById);
router.post("/", productManager.addProduct);
router.put("/:id", productManager.updateProduct);
router.delete("/:id", productManager.deleteProduct);

module.exports = router;
