const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define("cart", {
  //    quantity: Sequelize.INTEGER,
  //    defaultValue: 1,
  //    validate: {
  //      notEmpty: true,
  //      min: 1,
  //    },
  //  id int [pk, increment] // auto-increment
    paid: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    shipped: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  
  });

module.exports = Cart;
