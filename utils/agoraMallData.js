const { chromium } =  require('playwright');
const saveDataToBD = require("./saveData");

const getStoresFromAgoraMall = async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const selector = '.directorio__store';
    await page.goto('https://agora.com.do/directorio/', { waitUntil: 'networkidle' });

    let results = [];
    if(await page.isVisible(selector)){
        await page.waitForSelector(selector);
   
        results = await page.evaluate((selector) => {
            let listStores = [];
            document.querySelectorAll(selector).forEach(store => {
                const isTel = store.getElementsByClassName('directorio__store-item')[1]?.getElementsByTagName('small')[0].getElementsByTagName("a")[0] ? false : true;
                const telefono = () => {
                    const telefono = isTel ? store.getElementsByClassName('directorio__store-item')[1]?.getElementsByTagName('small')[0].innerText ? 
                        [store.getElementsByClassName('directorio__store-item')[1]?.getElementsByTagName('small')[0].innerText] : [] : [];
                    
                    return telefono;
                }
                listStores.push({
                    image: store.getElementsByClassName('directorio__store-image')[0].getAttribute('style').split("'")[1].split("'")[0],
                    name: store.getElementsByClassName('directorio__store-title')[0].innerText,
                    link: isTel ? store.getElementsByClassName('directorio__store-item')[2]?.getElementsByTagName('a')[0].href || "" : store.getElementsByClassName('directorio__store-item')[1]?.getElementsByTagName('small')[0].getElementsByTagName("a")[0].href || "",
                    information: {
                        place: store.getElementsByClassName('directorio__store-item locate')[0].getElementsByTagName('small')[0].innerText,
                        telephones: telefono()
                    },
                    plaza: "Agora Mall"
                });
            });

            return listStores;
        }, selector);
        
        await browser.close();
    }
    
    return results;
}

const setAgoraMallData = async () => {
    const tiendas = await getStoresFromAgoraMall();
    await saveDataToBD('Agora Mall', tiendas);
}

module.exports = setAgoraMallData;

