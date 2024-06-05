const cartService = require("../services/cart.service.js");

class CartManager {
  async addCart(req, res) {
    try {
      const cart = await cartService.addCart({ products: [] });

      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCartById(req, res) {
    try {
      const cart = await cartService.getCartById(req.params.cid);

      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addProductToCart(req, res) {
    try {
      const cart = await cartService.addProductToCart(
        req.params.cid,
        req.params.pid,
        req.body.quantity
      );
      console.log(cart);
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProductToCart(req, res) {
    try {
      const cart = await cartService.deleteProductToCart(
        req.params.cid,
        req.params.pid
      );

      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  a; // cart.manager.js
  async updateCart(req, res) {
    try {
      const cart = await cartService.updateCart(req.params.cid, req.body);

      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // cart.manager.js
  async updateCountToProduct(req, res) {
    try {
      const cart = await cartService.updateCountToProduct(
        req.params.cid,
        req.params.pid,
        req.body.quantity // Utiliza req.body.quantity en lugar de req.body
      );

      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async cleanCart(req, res) {
    try {
      const cart = await cartService.cleanCart(req.params.cid);

      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CartManager;
