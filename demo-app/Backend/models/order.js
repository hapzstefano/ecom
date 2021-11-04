const mongoose = require('mongoose');

const horderSchema = new mongoose.Schema({
    tanggal_trans: {type: Date, required: true},
    tanggal_pengiriman: {type: Date, required: true},
    grandtotal: {type: Number, required: true},
    estimasi_waktu: {type: Number, required: true},
    metode_pembayaran: {type: String, required: true},
    status: {type: Number, required: true},
    pegawai: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pegawai",
        required: true
    },
    promo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "promo",
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
        required: true
    },
    detail_order: [{
        type: {
            id_dorder: {type: String, required: true},
            qty: {type: Number, required: true},
            total: {type: Number, required: true},
            barang_beli: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "barang",
                required: true
            }
        },
        required: false    
    }]
},{collection : "horder"})

module.exports = mongoose.model('horder', horderSchema)
