const mongoose = require('mongoose');

 const customerSchema = new mongoose.Schema({
    id_cust: {type: String, required: true},
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
})

module.exports = mongoose.model('customer', customerSchema)

