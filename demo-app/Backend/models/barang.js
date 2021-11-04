const mongoose = require('mongoose');

const barangSchema = new mongoose.Schema({
    nama: {type: String, required: true},
    harga: {type: Number, required: true},
    stok: {type: Number, required: true},
    gambar: {type: String, required: true},
    status: {type: Number, required: true},
    kategori: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "kategori",
        required: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brand",
        required: true
    },
    review: [{
        type: {
            id_review: {type: String, required: true},
            comment: {type: String, required: true},
            rating: {type: String, required: true},
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "customer",
                required: false
            }
        },
        required: false    
    }]
},{collection : "barang"})

module.exports = mongoose.model('barang', barangSchema)