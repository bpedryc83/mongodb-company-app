const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/products.controller');

router.get('/products', ProductController.getAll);
router.get('/products/random', ProductController.getRandom);
router.get('/products/:id',ProductController.getOne);
router.post('/products', ProductController.postOne);
router.put('/products/:id', ProductController.putOne);
router.delete('/products/:id', ProductController.deleteOne);

module.exports = router;
