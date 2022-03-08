const router = require('express').Router();
const {
    models: { Cart, CartItem ,Pie,Address},
} = require('../db');
const {requireUserToken} = require('./gatekeeper')

module.exports = router;

// GET /api/cart/
router.get('/', requireUserToken, async(req, res, next) => {
  try {
    if(req.user){
    const user = req.user;
    const [cart] = await user.getCarts({where: {paid: false}})
    const cartItems = await cart.getCartitems();
    const data = await Promise.all(cartItems.map(async (item) => {
      let pie = await Pie.findByPk(item.pieId);
      return {id: item.id, quantity: item.quantity, pie: pie}
    }))
    res.send(data)
  }
  res.send()
  } catch (error) {
    
  }
})

// POST /api/cart/cartitem
router.post('/cartitem', requireUserToken, async(req, res, next) => {
  try {
    if(req.user) {
      const user = req.user;
      const [cart] = await user.getCarts({where: {paid: false}})
      await cart.createCartitem({pieId: req.body.pieId, quantity: req.body.quantity})
//      const [cartitem] = await cart.getCartitems({where: {pieId: req.body.pieId}});
      //console.log(cartitem.quantity)
//      cartitem.update({quantity: req.body.quantity})
//      cartitem.save()
      //console.log('cartitem.quantity', cartitem.quantity)
      res.status(204).end();
    }
  } catch (error) {
    next(error)
  }
})

// PUT /api/cart/cartitem
router.put('/cartitem', requireUserToken, async(req, res, next) => {
  try {
    if(req.user) {
      const user = req.user;
      const [cart] = await user.getCarts({where: {paid: false}})
      const [cartitem] = await cart.getCartitems({where: {pieId: req.body.pieId}});
      //console.log(cartitem.quantity)
      cartitem.update({quantity: req.body.quantity})
      cartitem.save()
      //console.log('cartitem.quantity', cartitem.quantity)
      res.status(204).end();
    }
  } catch (error) {
    next(error)
  }
})


// DELETE /api/cart/cartitem
router.delete('/cartitem/:pieId', requireUserToken, async(req, res, next) => {
  try {
    if(req.user) {
      const user = req.user;
      const [cart] = await user.getCarts({where: {paid: false}})
      const [cartitem] = await cart.getCartitems({where: {pieId: req.params.pieId}});
      await cart.removeCartitems(cartitem.id);

      res.status(204).end();
    }
  } catch (error) {
    next(error)
  }
})

// PUT /api/cart/checkout  -- for when a user is signed in, change cart to paid = true
router.put('/checkout', requireUserToken, async(req, res, next) => {
  try {
    if(req.user) {
      const user = req.user;
      const address = req.body.address
      const [cart] = await user.getCarts({where: {paid: false}})
      await cart.setPaidTrue();
      await user.createCart()
      const oldAddress = await Address.findByPk(address.id)
      await oldAddress.update({...req.body.address})
      oldAddress.save();
//      const [cartitem] = await cart.getCartitems({where: {pieId: req.body.pieId}});
      //console.log(cartitem.quantity)
//      cartitem.update({quantity: req.body.quantity})
//      cartitem.save()
      //console.log('cartitem.quantity', cartitem.quantity)
      res.status(204).end();
    }
  } catch (error) {
    next(error)
  }
})


// POST /api/cart/checkout  -- for when a user is not logged in, save cart to DB
router.post('/checkout', async (req, res, next) => {
  try {

    const not_signed_in_cart = await Cart.create({paid: false})
    for (let i of req.body.cart) {
      await not_signed_in_cart.createCartitem({pieId: i.pie.id, quantity: i.quantity});
    }
    let address = req.body.address

    await not_signed_in_cart.createAddress({...address})
    await not_signed_in_cart.setPaidTrue()
    res.status(201).end();


//    res.send({token: await user.generateToken()})


//    const user = await User.create(req.body)
//    const cart = await user.createCart()
//    for (let i of req.body.localCart) {
//      await cart.createCartitem({pieId: i.pie.id, quantity: i.quantity});
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists!')
    } else {
      next(err)
    }
  }
})
