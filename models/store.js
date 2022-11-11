const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: false,
        trim: true
    },
    link: {
        type: String,
        required: false,
        trim: true
    },
    information: {
        type: Object,
        required: false
    },
    plaza: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true});

module.exports = mongoose.model('Store', storeSchema);