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
      Pie.create({ name: 'Clam Chowder Pie', countryOrigin: 'United States', type: 'Savory', description: 'basically a breadbowl'}),
      Pie.create({ name: 'Ghost Pepper Tart', countryOrigin: 'Antarctica', type: 'Savory', description: 'really spicy!'})
    ])
  console.log(`seeded ${pies.length} pies from seed.js`)
    for (let wikiPie of jsonPieData) {
       //console.log(wikiPie)
       await Pie.create(wikiPie);
    }
  console.log(`seeded ${jsonPieData.length} pies from pies.json`)



  // Creating Users
//  const users = await Promise.all([
//    User.create({ username: 'cody', password: '123', email: 'cody@seed.js', type: 'admin'}),
//    User.create({ username: 'murphy', password: '123', email: 'murphy@seed.js' }),
//  ])
//  console.log(`seeded ${users.length} users from seed.js`)

  jsonUserData.unshift({ username: 'cody', password: '123', email: 'cody@seed.js', type: 'admin'})
  jsonUserData.unshift({ username: 'murphy', password: '123', email: 'murphy@seed.js' })
    
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
     await createdUser.createAddress({customerName: createdUser.firstName + ' ' + createdUser.lastName, ...streetAddress})

  }
  console.log(`seeded ${jsonUserData.length} users from users.json`)



    const not_signed_in_cart = await Cart.create({paid: true})
    await not_signed_in_cart.createCartitem({pieId: 17, quantity: 66})
    await not_signed_in_cart.createAddress({name:"cccccccc", streetAddress: "dddddd"})

    const tmpusers = await User.findAll();
    await tmpusers[0].createCart()
    await tmpusers[1].createCart()
    //const tmp_user_1_cart[0] = await tmpusers[1].getCarts({where: {paid: 'false'}})
    const tmp_user_1_cart = await tmpusers[1].getCarts()
    await tmpusers[1].createAddress({name:"aaaa", streetAddress: "bbbbbb", cartId: tmp_user_1_cart[0].id})

    //console.log(Object.keys(Cart.prototype))
    //console.log(Object.keys(User.prototype))


    const a_cart = await Cart.findOrCreate({where: {userId: 10}})
    //console.log('a_cart', a_cart)
    await a_cart[0].createCartitem({pieId: 27, quantity: 44})

  // Associations
//  const tmppies = await Pie.findAll();
//  const tmpusers = await User.findAll();

     //Cart.create(tmpusers[0])

 /* 
  const tmpcartpies = [tmppies[0], tmppies[5], tmppies[8]]
  await tmpusers[0].addPies(tmpcartpies, {quantity: 5})
  await tmpusers[0].addPies(tmpcartpies, {quantity: 5})
  for (let p in tmppies) {
    
    await tmpusers[0].createCart()
    await tmpusers[1].createCart()
    //const tmp_user_1_cart[0] = await tmpusers[1].getCarts({where: {paid: false}})
    const tmp_user_1_cart = await tmpusers[1].getCarts()
    const tmp_user_1_cart_id = tmp_user_1_cart.id
    console.log('tmp_user_1_cart', tmp_user_1_cart)
    console.log('tmp_user_1_cart_id', tmp_user_1_cart_id)
//    console.log('tmp_user_1_cart_id', tmp_user_1_cart.cart.id)
    console.log('tmp_user_1_cart_id', tmp_user_1_cart[0].id)
    await tmpusers[1].createAddress({name:"aaaa", streetAddress: "bbbbbb", cartId: tmp_user_1_cart[0].id})
    const tmp_user_1_address = await tmpusers[1].getAddress()
    //await tmp_user_1_cart.setAddress(tmp_user_1_address)
//    await tmp_user_1_address.setCart(tmp_user_1_cart)


    const tmpcarts = await Cart.findAll()

    console.log(Object.keys(Cart.prototype))
    //console.log(Object.keys(User.prototype))
    await tmpcarts[0].createCartitem({pieId: 4, quantity: 9})

    const a_cart = await Cart.create({userId: 9})
//    const a_cart = await Cart.findOrCreate({where: {userId: 10}})
    console.log(a_cart)
//    console.log(Object.keys(a_cart))
    //await a_cart.createCartitem({pieId: 27, quantity: 44})
//////    await a_cart.createCartitem({pieId: 27, quantity: 33})
   
    const not_signed_in_cart = await Cart.create()
    await not_signed_in_cart.createCartitem({pieId: 17, quantity: 66})
    await not_signed_in_cart.createAddress({name:"cccccccc", streetAddress: "dddddd"})
 
  for (let i in [4,6,8]) {
    //await tmpusers[0].addPie(tmppies[i], { through: { quantity: 5 }})
  }
  console.log(tmpusers[0].username)
  console.log(`associated ${tmpcartpies.length} pies to ${tmpusers[0].username} seed.js`)

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
