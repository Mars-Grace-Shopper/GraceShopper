a way to turn [https://en.wikipedia.org/wiki/List_of_pies,_tarts_and_flans](https://en.wikipedia.org/wiki/List_of_pies,_tarts_and_flans) into a json file 


1. `npm install`
2. `curl https://en.wikipedia.org/wiki/List_of_pies,_tarts_and_flans > wiki.html`
3. `node pies.js`
4. you now have a `pies.json` file

to use this json later:

`const jsonData = require('./pies.json');`

note: price is stored as cents; to display corrently: `(9000 / 100).toFixed(2)`

---

use `node users.js` to generate `users.json`

---

to use address.js

```
const genAddr = require('./address.js');

const main = async () => {
  addrObj = await genAddr()
  console.log(addrObj)
}

main()
```

which will give an object that looks like

```
{
  streetAddress: '806 Evanescent Crescent',
  city: 'Scarf',
  state: 'MD',
  zipcode: 20299
}
```



wordlists come from [https://www.gutenberg.org/ebooks/3201](https://www.gutenberg.org/ebooks/3201)


