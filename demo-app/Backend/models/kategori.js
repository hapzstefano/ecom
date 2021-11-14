const mongoose = require('mongoose');

const kategoriSchema = new mongoose.Schema({
    nama: {type: String, required: true},
    status: {type: Number, required:true}
},{collection : "category"})

module.exports = mongoose.model('category', kategoriSchema)