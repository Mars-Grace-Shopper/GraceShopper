const router = require('express').Router();
const {
  models: { Pie },
} = require('../db');
const { requireAdminToken } = require('./gatekeeper');
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

// PUT /api/pies/:id to update a pie
router.put('/:id', requireAdminToken, async (req, res, next) => {
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

// POST /api/pies to add a new pie
router.post('/', requireAdminToken, async (req, res, next) => {
  try {
    if (!req.admin) throw new Error('Unauthorized');
    const newPie = await Pie.create(req.body);
    res.send(newPie);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/pies/:id
router.delete('/:id', requireAdminToken, async (req, res, next) => {
  try {
    if (!req.admin) throw new Error('Unauthorized');
    const pie = await Pie.findByPk(req.params.id);
    if (!pie) {
      let err = new Error('Cannot remove pie - ID not found!');
      err.status = 404;
      next(err);
    }
    await pie.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
