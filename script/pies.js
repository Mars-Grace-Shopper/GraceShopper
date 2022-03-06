const tabletojson = require('tabletojson').Tabletojson;
const fs = require('fs');
const path = require('path');

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);



const countryCode = (inputStr) => {
  switch (inputStr) {

    case "Albania":
      return ['AL'];
    case "Australia":
      return ['AU'];
    case "Australia and New Zealand":
    case "Australia, New Zealand":
      return ['AU','NZ'];
    case "Canada":
    case "Canada (Nova Scotia, Prince Edward Island)":
    case "Canada (Quebec)":
    case "Canada (Western Canada)":
      return ['CA'];
    case "Canada, United States":
      return ['CA', 'US'];
    case "China":
      return ['CN'];
    case "Croatia":
      return ['HR'];
    case "Eastern Europe (Ashkenazi Jews)":
      return [];
    case "Finland":
    case "Finland (Savonia)":
      return ['FI'];
    case "Finland, Russia (Karelia)":
      return ['FI','RU'];
    case "France":
      return ['FR'];
    case "Georgia":
      return ['GE'];
    case "Germany":
    case "Bavaria":
      return ['DE'];
    case "Greece":
      return ['GR'];
    case "Hong Kong":
      return ['HK'];
    case "India":
    case "Indian Subcontinent, Central Asia, Western Asia, Horn of Africa, North Africa, South Africa":
      return ['IN'];
    case "Indonesia (Bengkulu)":
      return ['ID'];
    case "Italy, United States":
      return ['IT','US'];
    case "Jamaica":
      return ['JM'];
    case "Lebanon":
      return ['LB'];
    case "Malaysia, Singapore, Thailand":
      return ['MY','SG','TH'];
    case "Morocco":
      return ['MA'];
    case "Netherlands":
      return ['NL'];
    case "North Macedonia":
      return ['MK'];
    case "Philippines":
      return ['PH'];
    case "Portugal":
      return ['PT'];
    case "Río de la Plata (Argentina, Uruguay, Paraguay)":
      return ['AR','UY','PY'];
    case "Romania, Moldova":
      return ['RO','MD'];
    case "Russia":
      return ['RU'];
    case "Russia, Ukraine":
      return ['RU','UA'];
    case "Russia (Volga Germans)":
      return ['RU','DE'];
    case "Russia (Volga region)":
      return ['RU'];
    case "Serbia":
      return ['RS'];
    case "South Africa":
      return ['ZA'];
    case "Spain":
      return ['ES'];
    case "Sri Lanka":
      return ['LK'];
    case "Sweden":
      return ['SE'];
    case "Switzerland":
    case "Switzerland (Graubünden)":
      return ['CH'];
    case "The Balkans":
      return [];
    case "Trinidad and Tobago":
      return ['TT'];
    case "Turkey (Anatolia)":
      return ['TR'];
    case "United Kingdom":
      return ['GB'];
    case "United Kingdom (Cumbria)":
    case "United Kingdom (England)":
    case "Yorkshire, Lancashire, and Cumbria regions in the United Kingdom":
      return ['GB','GB-ENG'];
    case "United Kingdom, France":
      return ['GB','FR'];
    case "United Kingdom (Kilmarnock, Scotland)":
    case "United Kingdom (Scotland)":
      return ['GB','GB-SCT'];
    case "United Kingdom, United States":
      return ['GB','US'];
    case "United States":
    case "United States (Amish community)":
    case "United States (Florida)":
    case "United States (Kentucky)":
    case "United States (Louisiana)":
    case "United States (Minnesota)":
    case "United States (New England)":
    case "United States (North Carolina)":
    case "United States (Pennsylvania Dutch Country)":
    case "United States (Southern)":
    case "United States (New England)":
    case "United States (North Carolina)":
    case "United States (Pennsylvania Dutch Country)":
    case "United States (Southern)":
      return ['US'];
    case "United States, Mexico":
      return ['US','MX'];
    case "Worldwide":
      return [];
    default:
      return [];
  }
  
}





const main = async () => {

const html = await fs.readFileSync(path.resolve(__dirname, 'wiki.html'), {encoding: 'UTF-8'});
const htmljson = tabletojson.convert(html, { stripHtmlFromCells: false })[0];
const parsedjson = tabletojson.convert(html)[0];

//console.log(`htmljson.length: ${htmljson.length}  parsedjson.length: ${parsedjson.length}`)
//console.dir(parsedjson, {depth: null})
//console.dir(htmljson, {depth: null})

const seedjson = [];

for (let i = 0; i < htmljson.length; i++) {
  const imghtml = htmljson[i]['Image']
  let tmpThumb, tmpType, tmpName, tmpOrigin

  if (imghtml.length > 0) {
    tmpThumb = 'https:' + imghtml.split(' ').filter(w => w.includes('src='))[0].split('"')[1]
  } else {
    tmpThumb = "https://www.simplyrecipes.com/thmb/s874U4AjfQBxYGz2nj5SWc-kYLg=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Lattice-Pie-Crust-LEAD-1-1e320e0b6b864abbb0d038042a0af55b.jpg"
  }

  if (parsedjson[i].Type == 'Sweet or savory') {
    tmpType = 'Savory or sweet';
  } else {
    tmpType = parsedjson[i].Type;
  }
  

  if (htmljson[i].Name.includes('<br')) {
    tmpName = htmljson[i].Name.split('title="')[1].split('"')[0]
  } else {
    tmpName = parsedjson[i].Name
  }

  if (parsedjson[i].Origin) {
    tmpOrigin = parsedjson[i].Origin
  } else {
    tmpOrigin = 'Antarctica'
  }

  let tmpPie = {
    name: tmpName.replace(/\[\d*\]/g, '').replace(/\[\es\]/g, ''),
    countryOrigin: tmpOrigin.replace(/\[\d*\]/g, '').replace(/\n/g, ' '),
    type: tmpType,
    description:parsedjson[i].Description.replace(/\[\d*\]/g, ''),
    thumbnailurl: tmpThumb,
    price: randomInt(700, 1000)
  }

  tmpPie.countryCode = countryCode(tmpPie.countryOrigin);

  //console.log(parsedjson[i].Name) 
  //console.log(htmljson[i].Name) 
  //console.log(tmpPie) 
//  console.log(parsedjson[i])
  //if (i == 1) process.exit();
  seedjson.push(tmpPie)
}
  
const data = JSON.stringify(seedjson);
await fs.writeFileSync('pies.json', data, {encoding:'utf8', flag:'w'});

}


main()

