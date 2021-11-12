const mongoose = require('mongoose');

const jenisMemberSchema = new mongoose.Schema({
    nama: {type: String, required: true},
    minimal_poin: {type: Number, required: true},
    potongan: {type: Number, required: true},
    status: {type: Number, required: true},
},{collection : "jenisMember"})

module.exports = mongoose.model('jenisMember', jenisMemberSchema)
