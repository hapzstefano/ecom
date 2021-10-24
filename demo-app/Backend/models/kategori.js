const mongoose = require('mongoose');

const kategoriSchema = new mongoose.Schema({
    id_kat: {type: String, required: true},
    nama: {type: String, required: true}
})

module.exports = mongoose.model('kategori', kategoriSchema)