//this is the access point for all things database related!
const Sequelize = require('sequelize');

const db = require('./db');

const Pie = require('./models/Pie');
const User = require('./models/User');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

//associations could go here!

Pie.belongsToMany(User, { through: Cart, unique: false });
User.belongsToMany(Pie, { through: Cart, unique: false });

Pie.belongsToMany(User, { through: Order });
User.belongsToMany(Pie, { through: Order });

module.exports = {
  db,
  models: {
    Pie,
    User,
    Cart,
    Order,
  },
};
