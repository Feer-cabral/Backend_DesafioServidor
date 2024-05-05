import ProductModel from "../models/product.model.js";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    const productos = await ProductModel.find();

    if (!productos) {
      console.log("Error al obtener los productos", error);
    }

    return productos;
  }

  async getProductById(id) {
    const product = await ProductModel.findOne({ _id: id });

    if (!product) {
      console.log("Error al obtener el producto", error);
    }

    return product;
  }

  async agregarProducto(product) {
    const nuevoProducto = await ProductModel.create(product);

    if (!nuevoProducto) {
      console.log("Error al agregar el producto", error);
    }

    return nuevoProducto;
  }

  async actualizarProducto(id, updatedProduct) {
    const product = await ProductModel.findByIdAndUpdate(id, updatedProduct);

    if (!product) {
      console.log("Error al actualizar el producto", error);
    }

    return product;
  }

  async borrarProducto(id) {
    const product = await ProductModel.findByIdAndDelete(id);

    if (!product) {
      console.log("Error al borrar el producto", error);
    }

    return product;
  }
}

export default ProductManager;
