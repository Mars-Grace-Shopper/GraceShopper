const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  quantity: Sequelize.INTEGER,
});

module.exports = Order;
