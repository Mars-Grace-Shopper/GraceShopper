const router = require('express').Router();
const {
  models: { Pie },
} = require('../db');
module.exports = router;

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
