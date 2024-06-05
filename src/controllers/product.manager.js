const productService = require("../services/product.service.js");

class ProductManager {
  async addProduct(req, res) {
    const {
      title,
      description,
      img,
      code,
      price,
      stock,
      category,
      thumbnails,
    } = req.body;
    try {
      let product = await productService.addProduct({
        title,
        description,
        img,
        code,
        price,
        stock,
        category,
        status: true,
        thumbnails: thumbnails || [],
      });

      await product.save();
      res.json({ message: "Producto creado con exito", product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProducts(req, res) {
    try {
      const products = await productService.getProducts();
      res.json({ message: "Estos son todos los productos listados", products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const products = await productService.getProducts();

      const product = products.find(
        (product) => product._id.toString() === req.params.id
      );

      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const updatedProduct = await productService.updateProduct(
        req.params.id,
        req.body
      );

      res.json({ message: "Producto actualizado con exito", updatedProduct });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const deleted = await productService.deleteProduct(req.params.id);
      res.json({ message: "Producto eliminado con exito", deleted });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductManager;
