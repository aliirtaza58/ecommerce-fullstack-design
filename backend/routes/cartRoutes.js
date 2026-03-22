const express = require('express');
const Cart = require('../models/Cart');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      res.json(cart);
    } else {
      res.json({ cartItems: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Save user cart
// @route   POST /api/cart
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { cartItems } = req.body;
    
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (cart) {
      cart.cartItems = cartItems;
      const updatedCart = await cart.save();
      res.json(updatedCart);
    } else {
      const newCart = new Cart({
        user: req.user._id,
        cartItems
      });
      const createdCart = await newCart.save();
      res.status(201).json(createdCart);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
