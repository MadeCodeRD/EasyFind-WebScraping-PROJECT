const storeSchema = require('../models/store');
const { response } = require('../utils/index');
const { StatusCodes } = require("http-status-codes")

const getStores = async (req, res) => {
    const filterBy = req.query.filterBy || "name";
    const filter = req.query.filter || "";
    const selectBy = req.query.selectBy || "plaza";
    const select = req.query.select || "";
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = limit * (page - 1);

    let query = {};

    if(filter && filterBy){
        query[filterBy] = { $regex: filter, $options: 'i' };
    }
    if(select && selectBy){
        query[selectBy] = { $regex: select, $options: 'i' };
    }
    
    let stores;

    stores = await storeSchema.find(query, undefined, { skip, limit }).sort('name');
    quantity = await storeSchema.find(query).countDocuments();
    
    response(StatusCodes.OK, "Operacion exitosa", { stores, quantity }, res);
}

module.exports = getStores;