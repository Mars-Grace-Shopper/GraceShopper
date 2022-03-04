const router = require('express').Router();
const {models: { Pie, User }} = require('../db');

module.exports = router;

const requireAdminToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    if(user.type === 'admin') req.admin = user;
    next();
  } catch(error) {
    next(error);
  }
};
// GET /api/pies
router.get('/', async (req, res, next) => {
  try {
    const pies = await Pie.findAll();
    res.json(pies);
  } catch (err) {
    next(err);
  }
});

// GET /api/pies/:id
router.get('/:id', async (req, res, next) => {
  try {
    const pie = await Pie.findByPk(req.params.id);
    res.json(pie);
  } catch (error) {
    next(error);
  }
});

router.put('/:id',requireAdminToken, async (req, res, next) => {
  try {
    if(!req.admin) throw new Error('Unauthorized')
    const id = req.params.id;
    const pie = await Pie.findByPk(id)
    await pie.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }}
)
// POST /api/pies to add a new pie
router.post('/', requireAdminToken, async (req, res, next) => {
  try {
    if(!req.admin) throw new Error('Unauthorized')
    const newPie = await Pie.create(req.body);
    res.send(newPie);
  } catch (error) {
    next(error);
  }
});
