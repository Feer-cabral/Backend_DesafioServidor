const CartModel = require("../models/cart.model.js");

class CartManager {
  constructor(path) {
    this.carts = [];
    this.path = path;
  }

  async crearCarrito() {
    try {
      const nuevoCarrito = new CartModel({ products: [] });
      await nuevoCarrito.save();
      return nuevoCarrito;
    } catch (error) {
      console.log("Error al crear un carrito: ", error);
    }
  }

  async getCarritoById(carritoId) {
    try {
      const carrito = await CartModel.findById(carritoId);

      if (!carrito) {
        console.log("No hay carrito con ese id");
        return null;
      }

      return carrito;
    } catch (error) {
      console.log("Error al obtener un carrito por id: ", error);
    }
  }

  async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
    try {
      const carrito = await this.getCarritoById(cartId);
      const existeProducto = carrito.products.find(
        (p) => p.product === productId
      );

      if (existeProducto) {
        existeProducto.quantity += quantity;
      } else {
        carrito.products.push({ product: productId, quantity });
      }

      carrito.markModified("products");
      await carrito.save();
      return carrito;
    } catch (error) {
      console.log("Error al agregar un producto al carrito: ", error);
      throw error;
    }
  }
}

module.exports = CartManager;
