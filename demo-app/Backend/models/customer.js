const mongoose = require('mongoose');

 const customerSchema = new mongoose.Schema({
    nama: {type: String, required: true},
    poin: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    notlp: {type: String, required: true},
    alamat: {type: String, required: true},
    status: {type: Number, required: true},
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jenisMember"
      }
},{collection : "customer"})

module.exports = mongoose.model('customer', customerSchema)

