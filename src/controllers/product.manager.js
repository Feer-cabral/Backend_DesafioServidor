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
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProducts(req, res) {
    try {
      const products = await productService.getProducts();
      res.json(products);
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
        return console.log("No se encontro el producto");
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

      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const deleted = await productService.deleteProduct(req.params.id);
      res.json(deleted);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductManager;
