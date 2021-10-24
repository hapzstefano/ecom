const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
    id_promo: {type: String, required: true},
    nama: {type: String, required: true},
    tanggal_awal: {type: Date, required: true},
    tanggal_akhir: {type: Date, required: true},
    potongan: {type: String, required: true},
    status: {type: Number, required: true}
})

module.exports = mongoose.model('promo', promoSchema)