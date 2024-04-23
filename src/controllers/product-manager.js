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
        console.log("Todos los campos son obligatorios");
        return;
      }

      const codigoRepetido = await ProductModel.findOne({ code: code });

      if (codigoRepetido) {
        console.log("El código debe ser único");
        return;
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
      console.log("Error al agregar producto", error);
      throw error;
    }
  }
  async getProducts() {
    try {
      const productos = await ProductModel.find();
      return productos;
    } catch (error) {
      console.log("Error al cargar los productos", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const producto = await ProductModel.findById(id);

      if (!producto) {
        console.log("Producto no encontrado");
        return null;
      } else {
        console.log("Producto encontrado");
        return producto;
      }
    } catch (error) {
      console.log("Error al encontrar el producto", error);
      throw error;
    }
  }

  async updateProduct(id, productoActualizado) {
    try {
      const producto = await ProductModel.findByIdAndUpdate(
        id,
        productoActualizado
      );

      if (!producto) {
        console.log("No se encontró el producto");
        return null;
      } else {
        console.log("Producto actualizado");
        return producto;
      }
    } catch (error) {
      console.log("Error al actualizar el producto", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const producto = await ProductModel.findByIdAndDelete(id);

      if (!producto) {
        console.log("No se encontró el producto");
        return null;
      } else {
        console.log("Producto eliminado");
        return producto;
      }
    } catch (error) {
      console.log("Error al eliminar el producto", error);
      throw error;
    }
  }
}

module.exports = ProductManager;
