const storeSchema = require("../models/store");

const saveDataToBD = async (plaza, tiendas) => {    
    if(tiendas.length > 0){
        await storeSchema.deleteMany({ plaza })
        await storeSchema.create(tiendas);
    }
}

module.exports = saveDataToBD;