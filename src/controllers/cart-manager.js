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
      throw error;
    }
  }

  async getCarritoById(carritoId) {
    try {
      const carrito = await CartModel.findById(carritoId)
        .populate({ path: "products.product", model: "ProductModel" })
        .exec();

      if (!carrito) {
        console.log("No hay carrito con ese id");
        return null;
      }

      return carrito;
    } catch (error) {
      console.log("Error al obtener un carrito por id: ", error);
      throw error;
    }
  }

  async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
    try {
      const carrito = await this.getCarritoById(cartId);
      const existeProducto = carrito.products.find(
        (p) => p.product.toString() === productId
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

  async eliminarProductoDelCarrito(cartId, productId) {
    try {
      const carrito = await CartModel.findById(cartId);

      if (!carrito) {
        throw new Error("No se encontró el carrito");
      }

      carrito.products = carrito.products.filter(
        (p) => p.product.toString() !== productId
      );

      carrito.markModified("products");
      await carrito.save();
      return carrito;
    } catch (error) {
      console.log("Error al eliminar un producto del carrito: ", error);
      throw error;
    }
  }

  async actualizarCarrito(cartId, products) {
    try {
      const carrito = await CartModel.findByIdAndUpdate(
        cartId,
        { products },
        { new: true }
      );

      if (!carrito) {
        throw new Error("No se encontró el carrito");
      }

      return carrito;
    } catch (error) {
      console.log("Error al actualizar el carrito: ", error);
      throw error;
    }
  }

  async actualizarCantidad(cartId, productId, quantity) {
    try {
      const carrito = await CartModel.findById(cartId);

      if (!carrito) {
        throw new Error("No se encontró el carrito");
      }

      const producto = carrito.products.find(
        (p) => p.product.toString() === productId
      );

      if (!producto) {
        throw new Error("No se encontró el producto en el carrito");
      }

      producto.quantity = quantity;
      carrito.markModified("products");
      await carrito.save();
      return carrito;
    } catch (error) {
      console.log("Error al actualizar la cantidad: ", error);
      throw error;
    }
  }

  async vaciarCarrito(cartId) {
    try {
      const carrito = await CartModel.findByIdAndUpdate(
        cartId,
        { products: [] },
        { new: true }
      );

      if (!carrito) {
        throw new Error("No se encontró el carrito");
      }

      return carrito;
    } catch (error) {
      console.log("Error al vaciar el carrito: ", error);
      throw error;
    }
  }
}

module.exports = CartManager;
