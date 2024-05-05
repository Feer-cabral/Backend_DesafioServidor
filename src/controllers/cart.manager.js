import { CartModel } from "../models/cart.model.js";

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  async crearCarrito() {
    const cart = new CartModel({ products: [] });

    if (!cart) {
      console.log("Error al crear el carrito", error);
      return null;
    }

    await cart.save();
    return cart;
  }

  async listarProductosPorCarrito(cartId) {
    const cart = await CartModel.findById(cartId);

    if (!cart) {
      console.log("Error al mostrar el carrito", error);
      return null;
    }

    return cart.products;
  }

  async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
    const cart = await CartModel.findById(cartId);
    const existeProducto = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (existeProducto) {
      existeProducto.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    cart.markModified("products");
    await cart.save();
    return cart;
  }

  async eliminarProductoDelCarrito(cartId, productId) {
    const cart = await CartModel.findById(cartId);

    if (!cart) {
      console.log("No se encontro el carrito", error);
      return null;
    }

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );

    cart.markModified("products");
    await cart.save();
    return cart;
  }

  async actualizarCarrito(cartId, products) {
    const cart = await CartModel.findById(cartId, { products }, { new: true });

    if (!cart) {
      console.log("No se encontro el carrito", error);
      return null;
    }

    cart.markModified("products");
    await cart.save();
    return cart;
  }

  async actualizarCantidad(cartId, productId, quantity) {
    const cart = await CartModel.findById(cartId);

    if (!cart) {
      console.log("No se encontro el carrito", error);
      return null;
    }

    const product = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (!product) {
      console.log("No se encontro el producto", error);
      return null;
    }

    product.quantity = quantity;

    cart.markModified("products");
    await cart.save();
    return cart;
  }

  async vaciarCarrito(cartId) {
    const cart = await CartModel.findByIdAndUpdate(
      cartId,
      { products: [] },
      { new: true }
    );

    if (!cart) {
      console.log("No se encontro el carrito", error);
      return null;
    }

    return cart;
  }
}

export default CartManager;
