const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    barang: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "barang",
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
        required: true
    },
    qty: {type: Number, required: true},
    status: {type: Number, required: true}
},{collection : "cart"})

module.exports = mongoose.model('cart', cartSchema)