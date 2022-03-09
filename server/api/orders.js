const router = require('express').Router();
const {
  models: { CartItem, Pie },
} = require('../db');
const { requireUserToken } = require('./gatekeeper');

module.exports = router;
// GET /api/orders/
router.get('/', requireUserToken, async (req, res, next) => {
  try {
    if (req.user) {
      const user = req.user;
      const orders = await user.getCarts({
        include: CartItem,
        where: { paid: true },
      });
      res.send(orders);
    }
    res.send();
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:id
router.get('/:id', requireUserToken, async (req, res, next) => {
  try {
    if (req.user) {
      const user = req.user;
      const [cart] = await user.getCarts({ where: { id: req.params.id } });
      const cartItems = await cart.getCartitems();
      const data = await Promise.all(
        cartItems.map(async (item) => {
          let pie = await Pie.findByPk(item.pieId);
          return { id: item.id, quantity: item.quantity, pie: pie };
        })
      );
      res.send(data);
    }
    res.send();
  } catch (error) {
    next(error);
  }
});
