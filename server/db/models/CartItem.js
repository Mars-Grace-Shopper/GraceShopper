const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define("cartitem", {
    cartId: Sequelize.INTEGER,
    pieId: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
});

module.exports = CartItem