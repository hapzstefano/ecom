const mongoose = require('mongoose');

const barangSchema = new mongoose.Schema({
    id_barang: {type: String, required: true},
    nama: {type: String, required: true},
    harga: {type: Number, required: true},
    stok: {type: Number, required: true},
    gambar: {type: String, required: true},
    status: {type: Number, required: true},
    id_kategori: {type: String, required: true},
    id_brand: {type: String, required: true}
})

module.exports = mongoose.model('barang', barangSchema)