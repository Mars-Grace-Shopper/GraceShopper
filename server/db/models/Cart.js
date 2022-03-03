const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  quantity: Sequelize.INTEGER,
  //    defaultValue: 1,
  //    validate: {
  //      notEmpty: true,
  //      min: 1,
  //    },
});

module.exports = Cart;
