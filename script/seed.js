'use strict'
const {db, models: {User, Pie} } = require('../server/db')
const jsonPieData = require('./pies.json');
const jsonUserData = require('./users.json');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', email: 'cody@seed.js', type: 'admin'}),
    User.create({ username: 'murphy', password: '123', email: 'murphy@seed.js' }),
  ])
  console.log(`seeded ${users.length} users from seed.js`)
  for (let u of jsonUserData) {
     //console.log(wikiPie)
     await User.create(u);
  }
  console.log(`seeded ${jsonUserData.length} users from users.json`)



  // Creating Pies
    const pies = await Promise.all([
      Pie.create({ name: 'Clam Chowder Pie', origin: 'United States', type: 'Savory', description: 'basically a breadbowl'}),
      Pie.create({ name: 'Ghost Pepper Tart', origin: 'Antarctica', type: 'Savory', description: 'really spicy!'})
    ])
  console.log(`seeded ${pies.length} pies from seed.js`)
    for (let wikiPie of jsonPieData) {
       //console.log(wikiPie)
       await Pie.create(wikiPie);
    }
  console.log(`seeded ${jsonPieData.length} pies from pies.json`)



  // Associations
  const tmppies = await Pie.findAll();
  const tmpusers = await User.findAll();
  const tmpcartpies = [tmppies[0], tmppies[5], tmppies[8]]
  await tmpusers[0].addPies(tmpcartpies)
  console.log(tmpusers[0].username)
  console.log(`associated ${tmpcartpies.length} pies to ${tmpusers[0].username} seed.js`)


  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
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
