const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: false
    },
    expirationDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Food', FoodSchema);
