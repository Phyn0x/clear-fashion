/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./eshops/dedicatedbrand');
const montlimartbrand = require('./eshops/montlimartbrand');
const circlesportswear = require('./eshops/circlesportswearbrand');
const fs = require('fs')

async function scrape (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    var products;
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
    switch(eshop){
      case 'https://www.dedicatedbrand.com/en/men/news':
        products = await dedicatedbrand.scrape(eshop);
        //fs.writeFile('dedicatedbrand.txt', JSON.stringify(products), (err) => {if (err) throw err;})
        break;
      case 'https://www.montlimart.com/99-vetements':
        products = await montlimartbrand.scrape(eshop);
        //fs.writeFile('montlimart.txt', JSON.stringify(products), (err) => {if (err) throw err;})
        break;
      case 'https://shop.circlesportswear.com/collections/collection-homme':
        products = await circlesportswear.scrape(eshop);
        //fs.writeFile('circlesportswear.txt', JSON.stringify(products), (err) => {if (err) throw err;})
        break;
    }
    

    //console.log(products);
    return products;
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function allscrape (){
  const liste = ['https://www.dedicatedbrand.com/en/men/news','https://www.montlimart.com/99-vetements','https://shop.circlesportswear.com/collections/collection-homme'] ;
  var products = [];
  for(let elem in liste){
    //products = products.concat(await scrape(liste[elem]));
    //console.log(products);
    let temp = await scrape(liste[elem]);
    products = products.concat(temp)
  }
  return products;
}

const [,, eshop] = process.argv;

//sandbox(eshop);
//console.log(allsandbox());
async function finalResult(){
  const temp = await allscrape();
  fs.writeFile('allProducts.json', JSON.stringify(temp), (err) => {if (err) throw err;});
  console.log("Fini !");
}

finalResult();