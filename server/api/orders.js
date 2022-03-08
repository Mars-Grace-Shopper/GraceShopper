const router = require('express').Router();
const {
    models: { Cart, CartItem ,Pie,Address},
} = require('../db');
const {requireUserToken} = require('./gatekeeper')

module.exports = router;

// GET /api/orders/
router.get('/', requireUserToken, async(req, res, next) => {
  try {
    if(req.user){
    const user = req.user;
    const orders = await user.getCarts({where: {paid: true}})
    res.send(orders)
  }
  res.send()
  } catch (error) {
    
  }
})
