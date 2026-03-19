const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products (Handles fetching all AND searching)
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    // Search by name or category dynamically
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }
    if (category && category !== 'all') {
      query.category = category;
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET /api/products/:id (Fetch single product)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;