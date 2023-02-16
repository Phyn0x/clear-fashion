/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./eshops/dedicatedbrand');
const montlimartbrand = require('./eshops/montlimartbrand');
const circlesportswear = require('./eshops/circlesportswearbrand');

async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    var products;
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
    switch(eshop){
      case 'https://www.dedicatedbrand.com/en/men/news':
        products = await dedicatedbrand.scrape(eshop);
        break;
      case 'https://www.montlimart.com/99-vetements':
        products = await montlimartbrand.scrape(eshop);
        break;
      case 'https://shop.circlesportswear.com/collections/collection-homme':
        products = await circlesportswear.scrape(eshop);
        break;
    }
    

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
