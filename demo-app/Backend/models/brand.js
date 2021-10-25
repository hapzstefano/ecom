const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    id_brand: {type: String, required: true},
    nama: {type: String, required: true},
    gambar: {type: String, required: true},
    deskripsi: {type: String, required: true},
    status: {type: Number, required: true}
})

module.exports = mongoose.model('brand', brandSchema)