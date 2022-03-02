//this is the access point for all things database related!
const Sequelize = require('sequelize')

const db = require('./db')

const Pie = require('./models/Pie')
const User = require('./models/User')

//associations could go here!

const Cart = db.define("cart", {
    quantity: Sequelize.INTEGER,
//    defaultValue: 1,
//    validate: {
//      notEmpty: true,
//      min: 1,
//    },
});

const Order = db.define("order", {
    quantity: Sequelize.INTEGER,
  });

Pie.belongsToMany(User, { through: Cart ,  unique: false})
User.belongsToMany(Pie, { through: Cart ,  unique: false})

Pie.belongsToMany(User, { through: Order })
User.belongsToMany(Pie, { through: Order })




module.exports = {
  db,
  models: {
    Pie,
    User,
  },
}
