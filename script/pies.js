const tabletojson = require('tabletojson').Tabletojson;
const fs = require('fs');
const path = require('path');


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
    name: tmpName,
    countryOrigin: tmpOrigin,
    type: tmpType,
    description:parsedjson[i].Description,
    thumbnailurl: tmpThumb,
    price: Math.floor(Math.random() * (10000 - 100) + 100)
  }

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

