const express = require('express');
const Product = require('../models/product');
const { auth } = require('../middlewares/middlewares');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .catch((err) => { throw new Error('Product not found') });
    if (!product) throw new Error('Product not found');
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', auth, async (req, res, next) => {
  try {
    const { name, price, quantity } = req.body;
    const userId = req.user._id.toString()
    const product = new Product({ name, price, quantity, userId });
    console.log(product)
    await product.save();
    res.json({ message: 'Product created successfully' });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const product = await Product.findById(id)
      .catch((err) => { throw new Error('Product not found') });
    if (!product) throw new Error('Product not found');
    product.name = name || product.name;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    await product.save();
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .catch((err) => { throw new Error('Product not found') });
    if (!product) throw new Error('Product not found');
    await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;