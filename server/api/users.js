const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router
const requireAdminToken = require('./gatekeeper')

// Only Admin can view user information:
router.get('/', requireAdminToken,  async (req, res, next) => {
  try {
    // if (!req.admin) throw new Error('Unauthorized');
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

// -------------- HAVE TO REFACTOR BELOW -------------

// GET /api/userhome/:id
router.get('userhome/:id', async (req, res, next) => {
  try {
    const pie = await Pie.findByPk(req.params.id);
    res.json(pie);
  } catch (error) {
    next(error);
  }
});

// PUT /api/userhome/:id to update a user
router.put('userhome/:id', requireAdminToken, async (req, res, next) => {
  try {
    if (!req.admin) throw new Error('Unauthorized');
    const id = req.params.id;
    const pie = await Pie.findByPk(id);
    await pie.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});