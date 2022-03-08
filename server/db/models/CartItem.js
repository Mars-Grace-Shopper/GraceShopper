const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define("cartitem", {
    // JOE CR: Hmmmmm, these keys should exist through setting up associations. Let's discuss.
    cartId: Sequelize.INTEGER,
    pieId: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
});

module.exports = CartItem