const express = require("express");
const router = express.Router();
const getStores = require('../controllers/store');

router.get('', getStores)

module.exports = router;