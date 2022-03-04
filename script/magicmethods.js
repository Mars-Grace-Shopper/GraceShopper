const {db, models: {User, Pie, Cart, CartItem} } = require('../server/db')

for (let i of ['User', 'Pie', 'Cart', 'CartItem']) {
  console.log('\n  --------------------------------  \n')
  console.log(`Magic methods for ${i}:`)
  console.log(Object.keys(eval(i).prototype))
}
