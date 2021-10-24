const mongoose = require('mongoose');

const horderSchema = new mongoose.Schema({
    id_horder: {type: String, required: true},
    tanggal_trans: {type: Date, required: true},
    tanggal_pengiriman: {type: Date, required: true},
    grandtotal: {type: Number, required: true},
    estimasi_waktu: {type: Number, required: true},
    metode_pembayaran: {type: String, required: true},
    status: {type: Number, required: true},
    id_pegawai: {type: String, required: true},
    id_promo: {type: String, required: true},
    id_customer: {type: String, required: true}
})

module.exports = mongoose.model('horder', horderSchema)
