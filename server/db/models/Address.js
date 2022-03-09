const Sequelize = require('sequelize');
const db = require('../db');

const Address = db.define('address', {
  customerName: {
    type: Sequelize.STRING,
  },
  streetAddress: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zipcode: {
    type: Sequelize.STRING,
  },
  cartId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
});

module.exports = Address;
