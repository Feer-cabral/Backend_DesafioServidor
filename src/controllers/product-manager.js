const ProductModel = require("../models/product.model.js");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct({
    title,
    description,
    price,
    img,
    code,
    stock,
    category,
    thumbnails,
  }) {
    try {
      if (!title || !description || !price || !code || !stock || !category) {
        throw new Error("Todos los campos son obligatorios");
      }

      const codigoRepetido = await ProductModel.findOne({ code: code });

      if (codigoRepetido) {
        throw new Error("El código debe ser único");
      }

      const newProduct = new ProductModel({
        title,
        description,
        price,
        img,
        code,
        stock,
        category,
        status: true,
        thumbnails: thumbnails || [],
      });

      await newProduct.save();
    } catch (error) {
      console.error("Error al agregar producto", error);
      throw error;
    }
  }

  async getProducts(options, filter) {
    try {
      const productos = await ProductModel.paginate(filter, options);
      return productos;
    } catch (error) {
      console.error("Error al cargar los productos", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const producto = await ProductModel.findById(id);

      if (!producto) {
        throw new Error("Producto no encontrado");
      }

      return producto;
    } catch (error) {
      console.error("Error al encontrar el producto", error);
      throw error;
    }
  }

  async updateProduct(id, productoActualizado) {
    try {
      const producto = await ProductModel.findByIdAndUpdate(
        id,
        productoActualizado,
        { new: true }
      );

      if (!producto) {
        throw new Error("No se encontró el producto");
      }

      return producto;
    } catch (error) {
      console.error("Error al actualizar el producto", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const producto = await ProductModel.findByIdAndDelete(id);

      if (!producto) {
        throw new Error("No se encontró el producto");
      }

      return producto;
    } catch (error) {
      console.error("Error al eliminar el producto", error);
      throw error;
    }
  }
}

module.exports = ProductManager;
