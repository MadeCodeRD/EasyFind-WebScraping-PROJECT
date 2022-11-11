const { chromium } =  require('playwright');
const saveDataToBD = require("./saveData");

const getStoresFromSambil = async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const selector = '.cmsmasters_heading a';
    const sambilUrl = 'https://sambil.do/directorio/';

    await page.goto(sambilUrl, { waitUntil: 'networkidle' });
    await page.waitForSelector(selector);

    const results = await page.evaluate(({selector, sambilUrl}) => {
        let listStores = [];
        document.querySelectorAll(selector).forEach(store => {
            listStores.push({
                name: store.innerText,
                link: store.href.includes(sambilUrl) ? (store.href.split(sambilUrl)[1] === "#" ? "" : 'https://'.concat(store.href.split(sambilUrl)[1])) : store.href,
                plaza: 'Sambil'
            });
        });

        return listStores;
    }, {selector, sambilUrl});
    
    await browser.close();

    return results;
}

const setSambilData = async () => {
    const tiendas = await getStoresFromSambil();
    await saveDataToBD('Sambil', tiendas);
}

module.exports = setSambilData;