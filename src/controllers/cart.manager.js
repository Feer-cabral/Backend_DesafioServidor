const cartService = require("../services/cart.service.js");

class CartManager {
  async addCart(req, res) {
    try {
      const cart = await cartService.addCart({ products: [] });

      await cart.save();
      res.json({ message: "Carrito creado con exito", cart });
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

      await cart.save();
      res.json({ message: "El producto fue agregado al carrito", cart });
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
      res.json({ message: "El producto fue eliminado del carrito", cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCart(req, res) {
    try {
      const cart = await cartService.updateCart(req.params.cid, req.body);

      res.json({ message: "Carrito actualizado con exito", cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCountToProduct(req, res) {
    try {
      const cart = await cartService.updateCountToProduct(
        req.params.cid,
        req.params.pid,
        req.body.quantity
      );

      res.json({ message: "Cantidad actualizada con exito", cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async cleanCart(req, res) {
    try {
      const cart = await cartService.cleanCart(req.params.cid);

      await cart.save();
      res.json({
        message: "Todos los productos fueron eliminados del carrito",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CartManager;
