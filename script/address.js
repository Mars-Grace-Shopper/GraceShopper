const fs = require("fs");
const path = require('path');

const main = async () => {
  // source: https://gist.github.com/bubblerun/a624de5b4fa8ff0980010054a7220977
  statesArray = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
  
  // source: https://gist.github.com/bdbaraban/46985c45eae42b4fe52f6ec6f50eb27c
  const streetSuffixArray = [ "Avenue", "Bypass", "Circus", "Close", "Crescent", "Drive", "Gardens", "Grove", "Hill", "Lane", "Mead", "Mews", "Place", "Rise", "Road", "Row", "Square", "Street", "Vale", "Way", "Wharf" ]
  
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
  
  const wordPool = fs
    .readFileSync(path.resolve(__dirname, "wordlists/COMMON.TXT"))
    .toString()
    .split("\n")
    .filter((item) => item !== "")
    .filter((e) => !e.includes(" "))
    .filter((e) => !e.includes("-"))
    .filter((e) => !e.includes("'"));
  
  const randomWord = () => wordPool[randomInt(0, wordPool.length)].replace(/\r/g, "");
  const randomStreetSuffix = () => streetSuffixArray[randomInt(0, streetSuffixArray.length)];
  const randomState = () => statesArray[randomInt(0, statesArray.length)];
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  const uncapitalizeFirstLetter = (string) => string.charAt(0).toLowerCase() + string.slice(1);
  
  
  const randomString = (wordcount, maxchars) => {
    let tmpString = randomWord();
    while (wordcount > 0) {
      tmpString += " " + randomWord();
      wordcount--;
    }
    tmpString = tmpString.replace(/\r/g, "");
    if (maxchars) {
      return tmpString.substring(0, maxchars);
    } else {
      return tmpString;
    }
  };
  
  // --------------------------------------

    const tmpUser = {
      streetAddress: `${randomInt(1,999)} ${capitalizeFirstLetter(randomWord())} ${randomStreetSuffix()}`,
      city: capitalizeFirstLetter(randomWord()),
      state: randomState(),
      zipcode: randomInt(10000,99999),
    }
    return(tmpUser)
}

module.exports = main

// to use later:
// const genAddr = require('./address.js');
// addrObj = genAddr()

