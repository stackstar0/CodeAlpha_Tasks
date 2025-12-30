const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

// Admin only route to add products (for simple testing purposes)
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, imageUrl, stock } = req.body;
        const newProduct = await Product.create({ name, description, price, imageUrl, stock });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create product' });
    }
};
