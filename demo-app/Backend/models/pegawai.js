const mongoose = require('mongoose');

const pegawaiSchema = new mongoose.Schema({
    id_pegawai: {type: String, required: true},
    nama: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    notlp: {type: String, required: true},
    jenis: {type: Number, required: true},
    status: {type: Number, required: true}
})

module.exports = mongoose.model('pegawai', pegawaiSchema)
