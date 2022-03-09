const fs = require("fs");


const main = async () => {
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
  
  let firstNamePool = await fs
    .readFileSync("wordlists/NAMES-F.TXT")
    .toString()
    .split("\n")
    .filter((e) => e !== "");
  const fullFirstNamePoolLength = firstNamePool.length;
  
  let lastNamePool = await fs
    .readFileSync("wordlists/NAMES.TXT")
    .toString()
    .split("\n")
    .filter((e) => e !== "");
  const fullLastNamePoolLength = lastNamePool.length;
  
  const uniqueName = (namePool, ) => {
  
    if (typeof fullNamePoolLength === undefined)  {
      //only run this once! at beginning
      const fullNamePoolLength = namePool.length
      console.log(`namePool.length: ${namePool.length}`)
    }
  
    const randomName = () => namePool[randomInt(0, namePool.length)];
    if (namePool.length == 0) {
      console.log(red("ERROR: NO MORE UNIQUE NAMES"));
      console.log(
        "Max names possible from name list file: ",
        fullNamePoolLength - 1
      );
      process.exit(1);
    } else {
      let tmpName = randomName();
      namePool = namePool.filter((item) => item !== tmpName);
      return tmpName.replace(/\r/g, "");
    }
  };
  
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  const uncapitalizeFirstLetter = (string) => string.charAt(0).toLowerCase() + string.slice(1);
  
  // --------------------------------------
  
  const seedjson = []

  for (let i = 0; i< 25; i++) {
    let fName = uniqueName(firstNamePool);
    let lName = uniqueName(lastNamePool);
    let tmpUser = {
      username: `${uncapitalizeFirstLetter(fName)}${lName.charAt(0).toLowerCase()}${randomInt(1,9)}`,
      firstName: fName,
      lastName: lName,
      password: '123', 
      email: `${fName}${lName}@seed.js`,
      type: 'user',
    }
    seedjson.push(tmpUser)
  }
  const data = JSON.stringify(seedjson);
  await fs.writeFileSync('users.json', data, {encoding:'utf8', flag:'w'});
}

main()



