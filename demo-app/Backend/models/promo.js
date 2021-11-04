const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
    nama: {type: String, required: true},
    tanggal_awal: {type: Date, required: true},
    tanggal_akhir: {type: Date, required: true},
    potongan: {type: String, required: true},
    status: {type: Number, required: true}
},{collection : "promo"})

module.exports = mongoose.model('promo', promoSchema)