'use strict'
const {db, models: {User, Pie, Cart, CartItem} } = require('../server/db')
const jsonPieData = require('./pies.json');
const jsonUserData = require('./users.json');
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
const randomBool = () => Math.random() < 0.5;
const genAddr = require('./address.js');


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')



  // Creating Pies
    const pies = await Promise.all([
      Pie.create({ name: 'Clam Chowder Pie', countryOrigin: 'United States', type: 'Savory', description: 'basically a breadbowl', price: randomInt(700, 1000)}),
      Pie.create({ name: 'Ghost Pepper Tart', countryOrigin: 'Antarctica', type: 'Savory', description: 'really spicy!', price: randomInt(700, 1000)})
    ])
  console.log(`seeded ${pies.length} pies from seed.js`)
    for (let wikiPie of jsonPieData) {
       //console.log(wikiPie)
       await Pie.create(wikiPie);
    }
  console.log(`seeded ${jsonPieData.length} pies from pies.json`)



  // Creating Users
  //   Cody will always be first user!
  //   murphy will always be second!

  jsonUserData.unshift({ username: 'murphy', password: '123', email: 'murphy@seed.js', firstName: 'MuRpHy', lastName: 'yhprum' })
  jsonUserData.unshift({ username: 'cody', password: '123', email: 'cody@seed.js', type: 'admin', firstName: 'CoDy', lastName: 'ydoc'})
    
  for (let u of jsonUserData) {
     //console.log(wikiPie)
     const createdUser = await User.create(u);
     const createdCart = await createdUser.createCart()
     for (let i = 1; i < 5; i++) {
       if (randomBool()) {
         await createdCart.createCartitem({pieId: randomInt(1,100), quantity: randomInt(1,10)});         
       }
     }
     const streetAddress = await genAddr()
     //console.log(streetAddress)
     await createdUser.createAddress({
       customerName: createdUser.firstName + ' ' + createdUser.lastName, 
       cartId: createdCart.id,
       ...streetAddress
     })

  }
  console.log(`seeded ${jsonUserData.length} users from users.json`)



  // Extra Testing


  const not_signed_in_cart = await Cart.create({paid: true})
  await not_signed_in_cart.createCartitem({pieId: 17, quantity: 66})
  let tmpAddr = await genAddr()
  await not_signed_in_cart.createAddress({customerName:"not_signed_in customer", ...tmpAddr})



  const codyUser = await User.findOne({ where: { username: 'cody' } });

  // complete some orders for cody
  let [codyCart] = await codyUser.getCarts({where: {paid: false}})
  for (let i = 1; i <= 2; i++) {

    // set existing cart to a paid order
    await codyCart.setPaidTrue();

    // create new empty cart with paid set to false
    codyCart = await codyUser.createCart()

    // add some pies
    await codyCart.createCartitem({pieId: randomInt(1,100), quantity: randomInt(1,10)}) 
    await codyCart.createCartitem({pieId: randomInt(1,100), quantity: randomInt(1,10)}) 
    await codyCart.createCartitem({pieId: randomInt(1,100), quantity: randomInt(1,10)}) 
  }

  // get the cart that is marked paid as false; aka the actual cart
  [codyCart] = await codyUser.getCarts({where: {paid: false}})
  console.log(`\ncodys unpaid cart instance: ${JSON.stringify(codyCart)}`)
  const codyCartItems = await codyCart.getCartitems()
  console.log(`\nitems inside codys unpaid cart instance: ${JSON.stringify(codyCartItems)}`)

  // get an array of all the carts marked paid as true; aka past orders
  const codyOrders = await codyUser.getCarts({where: {paid: true}})
  console.log(`\ncodys past orders: ${JSON.stringify(codyOrders)}`)

  // print out all magic methods for each model    
  for (let i of ['User', 'Pie', 'Cart', 'CartItem']) {
    console.log('\n  --------------------------------  \n')
    console.log(`Magic methods for ${i}:`)
    console.log(Object.keys(eval(i).prototype))
  }


/*
    const a_cart = await Cart.findOrCreate({where: {userId: 10, paid: false}})
    //console.log('a_cart', a_cart)
    await a_cart[0].createCartitem({pieId: 27, quantity: 44})
*/
  console.log(`seeded successfully`)
//  return {
//    users: {
//      cody: users[0],
//      murphy: users[1]
//    }
//  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
