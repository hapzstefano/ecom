const mongoose = require('mongoose');

const kategoriSchema = new mongoose.Schema({
    nama: {type: String, required: true},
    gambar: {type:String, required: true}
},{collection : "category"})

module.exports = mongoose.model('category', kategoriSchema)