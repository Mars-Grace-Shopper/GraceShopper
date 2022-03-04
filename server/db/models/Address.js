const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define("address", {
    customerName: {
      type: Sequelize.STRING,
      //allowNull: false
    },
    streetAddress: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state:{
      type: Sequelize.STRING
    },
    zipcode: {
      type: Sequelize.INTEGER,
    },
    cartId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
  });

  module.exports = Address