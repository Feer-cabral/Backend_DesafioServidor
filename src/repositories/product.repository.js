const ProductModel = require("../models/product.model.js");

class ProductRepository {
  async getProducts() {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      throw new Error("Error al obtener los productos");
    }
  }

  async addProduct(newProduct) {
    try {
      const product = new ProductModel(newProduct);
      return await product.save();
    } catch (error) {
      throw new Error("Error al agregar el producto");
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductModel.findById(id);
      return product;
    } catch (error) {
      throw new Error("Error al obtener el producto");
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const product = await ProductModel.findByIdAndUpdate(id, updatedProduct, {
        new: true,
      });

      if (!product) {
        throw new Error("Producto no encontrado");
      }

      return product;
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new Error("Error de validación al actualizar el producto");
      } else {
        throw new Error("Error al actualizar el producto");
      }
    }
  }

  async deleteProduct(id) {
    try {
      const product = await ProductModel.findByIdAndDelete(id);
      return product;
    } catch (error) {
      throw new Error("Error al eliminar el producto");
    }
  }
}

module.exports = ProductRepository;
