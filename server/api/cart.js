const router = require('express').Router();
const {
    models: { Cart, CartItem },
} = require('../db');

module.exports = router;

// GET /api/cart/
router.get('/', async (req, res, next) => {
    try {
     
    } catch (err) {
      next(err);
    }
});
