const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    nama: {type: String, required: true},
    gambar: {type: String, required: true},
    deskripsi: {type: String, required: true},
    status: {type: Number, required: true}
},{collection : "brands"})

module.exports = mongoose.model('brands', brandSchema)
