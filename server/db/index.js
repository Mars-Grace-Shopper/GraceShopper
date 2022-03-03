//this is the access point for all things database related!
const Sequelize = require('sequelize');

const db = require('./db');

const Pie = require('./models/Pie');
const User = require('./models/User');
const Cart = require('./models/Cart');
const CartItem = require('./models/CartItem');
const Address = require('./models/Address');

//associations could go here!

User.hasMany(Cart)
Cart.belongsTo(User)

Pie.hasMany(CartItem)
Cart.hasMany(CartItem)

User.hasOne(Address)
Address.belongsTo(User)

Cart.hasOne(Address)
Address.belongsTo(Cart)

//Pie.belongsToMany(User, { through: Order });
//User.belongsToMany(Pie, { through: Order });

module.exports = {
  db,
  models: {
    Pie,
    User,
    Cart,
    CartItem,
    Address,
  },
};
