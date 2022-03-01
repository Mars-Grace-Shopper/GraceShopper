//this is the access point for all things database related!

const db = require('./db')

const Pie = require('./models/Pie')
const User = require('./models/User')

//associations could go here!

Pie.belongsToMany(User, { through: 'cart' })
User.belongsToMany(Pie, { through: 'cart' })

Pie.belongsToMany(User, { through: 'purchased' })
User.belongsToMany(Pie, { through: 'purchased' })




module.exports = {
  db,
  models: {
    Pie,
    User,
  },
}
