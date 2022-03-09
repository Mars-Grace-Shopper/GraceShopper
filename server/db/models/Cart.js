const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  paid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  shipped: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

// instance methods
// https://sebhastian.com/sequelize-instance-methods/

Cart.prototype.setPaidTrue = async function () {
  await this.set('paid', true).save();
  console.log('set order paid to true from Cart.prototype.setPaidTrue');
};

module.exports = Cart;
