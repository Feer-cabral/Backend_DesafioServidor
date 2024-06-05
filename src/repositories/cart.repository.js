const CartModel = require("../models/cart.model.js");

class CartRepository {
  async addCart(cartData) {
    try {
      const cart = new CartModel(cartData);
      return await cart.save();
    } catch (error) {
      throw new Error("Error al crear el carrito");
    }
  }

  async getCartById(cid) {
    try {
      const cart = await CartModel.findById(cid);

      return cart;
    } catch (error) {
      throw new Error("Error al obtener el carrito");
    }
  }

  async addProductToCart(cid, pid, quantity = 1) {
    try {
      const cart = await CartModel.findById(cid);
      const existProduct = cart.products.find((item) => item.product === pid);

      if (existProduct) {
        existProduct.quantity += quantity;
      } else {
        cart.products.push({ product: pid, quantity });
      }

      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (error) {
      // throw new Error("Error al agregar el producto al carrito");
      console.log(error);
    }
  }

  async deleteProductToCart(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      cart.products = cart.products.filter(
        (item) => item.product._id.toString() !== pid
      );

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error("Error al eliminar el producto del carrito");
    }
  }

  // cart.repository.js
  async updateCart(cid, updatedProducts) {
    try {
      const cart = await CartModel.findByIdAndUpdate(cid, updatedProducts, {
        new: true,
      });

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      return cart;
    } catch (error) {
      console.log(error);
      throw new Error("Error al actualizar el carrito");
    }
  }

  // cart.repository.js
  async updateCountToProduct(cid, pid, newQuantity) {
    try {
      const cart = await CartModel.findByIdAndUpdate(
        cid,
        { $set: { "products.$[elem].quantity": newQuantity } }, // Utiliza $set para actualizar la cantidad del producto
        { new: true, arrayFilters: [{ "elem.product": pid }] } // Filtros para encontrar el producto en el arreglo de productos
      );

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      return cart;
    } catch (error) {
      console.log(error);
      throw new Error(
        "Error al actualizar la cantidad del producto en el carrito"
      );
    }
  }

  async cleanCart(cid) {
    try {
      const cart = await CartModel.findByIdAndUpdate(
        cid,
        { products: [] },
        { new: true }
      );

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      return cart;
    } catch (error) {
      throw new Error("Error al vaciar el carrito");
    }
  }
}

module.exports = CartRepository;
