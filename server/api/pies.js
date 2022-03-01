const router = require('express').Router()
const { models: { Pie }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const pies = await Pie.findAll()
    res.json(pies)
  } catch (err) {
    next(err)
  }
})
