const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.manager.js");
const cartController = new CartController();

router.post("/", cartController.addCart);
router.get("/:cid", cartController.getCartById);
router.post("/:cid/product/:pid", cartController.addProductToCart);
router.delete("/:cid/product/:pid", cartController.deleteProductToCart);
router.put("/:cid", cartController.updateCart);
router.put("/:cid/product/:pid", cartController.updateCountToProduct);
router.delete("/:cid", cartController.cleanCart);

module.exports = router;
