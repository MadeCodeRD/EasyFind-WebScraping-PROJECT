const { setBlueMallData, setSambilData, setAgoraMallData } = require("../utils/index");

const search = async () => {
    await setBlueMallData();
    await setSambilData();
    await setAgoraMallData();
}

module.exports = search