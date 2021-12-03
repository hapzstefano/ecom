const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
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
},{collection : "wishlist"})

module.exports = mongoose.model('wishlist', wishlistSchema)