const Sequelize = require('sequelize');
const db = require('../db');

const Pie = db.define('pie', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  countryOrigin: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM(
      'Savory',
      'Sweet',
      'Savory or sweet',
      'Savory and sweet'
    ),
  },
  description: {
    type: Sequelize.TEXT,
  },
  thumbnailurl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://www.simplyrecipes.com/thmb/s874U4AjfQBxYGz2nj5SWc-kYLg=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Lattice-Pie-Crust-LEAD-1-1e320e0b6b864abbb0d038042a0af55b.jpg',
  },
  price: {
    type: Sequelize.INTEGER, // all prices are stored as cents
    defaultValue: 2000,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },

  stockQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },

  countryCode: {
    type: Sequelize.JSON,
    defaultValue: [],
  },
});

module.exports = Pie;
