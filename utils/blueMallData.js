const playwright = require('playwright');
const saveDataToBD = require("./saveData");

const abc = () => {
    const indexes = [];

    for(let i = 97; i <= 122; i++){
        indexes.push(String.fromCharCode(i));
    }

    indexes.push('other');

    return indexes;
}

const getStoresFromBlueMall = async () => {
    const indexes = abc();
    const tiendas = [];

    const browser = await playwright.chromium.launch();
    const page = await browser.newPage();
        
    for(let i = 0; i < indexes.length; i++){
        await page.goto('https://www.bluemall.com.do/index.php/directorio/alphaindex/' + indexes[i]);
        if(await page.isVisible('#yoo-zoo')){
            const selector = await page.waitForSelector('#yoo-zoo');
            const elementExists = await page.isVisible('.items ');

            if(elementExists){
                const elements = await selector.$eval('.items ', elements => {
                    const data = []
                    const listElms = elements.getElementsByClassName('teaser-item');
                    
                    for(let i = 0; i < listElms.length; i++){
                        if(listElms.item(i).childElementCount > 0){
                            const descripcionElement = listElms.item(i).getElementsByClassName('pos-description').item(0);
                            const enlaceElement = descripcionElement.getElementsByTagName('a')[0];
                            const infoData = enlaceElement ? descripcionElement.getElementsByClassName('element').item(0).innerText.split('w')[0]
                            : descripcionElement.getElementsByClassName('element').item(0).innerText;

                            const telefonos = () => {
                                const tels = [];

                                for(let i = 1; i < infoData.split('\n').length; i++){
                                    if(/\d/.test(infoData.split('\n')[i])){
                                        tels.push(infoData.split('\n')[i]);
                                    }
                                }
                                return tels;
                            }

                            const Tienda = {
                                image: listElms.item(i).getElementsByTagName('img')[0].src,
                                name: listElms.item(i).getElementsByTagName('h2')[0].innerText,
                                link: enlaceElement ? enlaceElement.href : "",
                                information: {
                                    place: infoData.split('\n')[0],
                                    telephones: telefonos()
                                },
                                plaza: "BlueMall"
                            }
                
                            data.push(Tienda);
                        }
                    }
        
                    return data;
                })
                tiendas.push(...elements);
            }
        }
    }
    
    await browser.close();

    return tiendas;
}

const setBlueMallData = async () => {
    const tiendas = await getStoresFromBlueMall();
    await saveDataToBD('BlueMall', tiendas);
}

module.exports = setBlueMallData;