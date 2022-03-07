const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router
const {requireAdminToken, requireUserToken} = require('./gatekeeper')

// ADMIN-ONLY ACCESS HERE ------------------------------

// GET /api/users
router.get('/', requireAdminToken,  async (req, res, next) => {
  try {
    if (!req.admin) throw new Error('Unauthorized');
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'type', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// USER ACCESS HERE -----------------------------------

// GET /api/users/:id
router.get('/:id', requireUserToken, async (req, res, next) => {
  try {
    const pie = await User.findByPk(req.params.id);
    res.json(pie);
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/:id to update user
router.put('/:id', requireUserToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    await user.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});