const mongoose = require('mongoose');

const jenisMemberSchema = new mongoose.Schema({
    id_member: {type: String, required: true},
    nama: {type: String, required: true},
    minimal_poin: {type: Number, required: true},
    potongan: {type: Number, required: true}
})

module.exports = mongoose.model('jenisMember', jenisMemberSchema)
