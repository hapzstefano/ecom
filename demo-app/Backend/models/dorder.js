const mongoose = require('mongoose');

const dorderSchema = new mongoose.Schema({
    id_dorder: {type: String, required: true},
    qty: {type: Number, required: true},
    total: {type: Number, required: true},
    id_horder: {type: String, required: true},
    id_barang: {type: String, required: true}
})

module.exports = mongoose.model('dorder', dorderSchema)