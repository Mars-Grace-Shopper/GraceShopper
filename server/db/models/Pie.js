const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');

const SALT_ROUNDS = 5;

const Pie = db.define('pie', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  orgin: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM('Savory', 'Sweet or savory', 'Sweet', 'Savory or sweet', 'Savory and sweet'), 
  },
  description: {
    type: Sequelize.TEXT,
  },
  thumbnailurl: {
    type: Sequelize.STRING,
    defaultValue: "/default.png",
  },
  price: {
    type: Sequelize.FLOAT,
    defaultValue: 20.00,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },

  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      notEmpty: true,
      min: 0,
    },
  }, 

})

module.exports = Pie

/**
 * instanceMethods
 */

/**
 * classMethods
 */


/**
 * hooks
 */
