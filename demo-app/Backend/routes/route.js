const Customer = require('../models/customer')
const Pegawai = require('../models/pegawai')
const Jenis_member = require('../models/jenis_member')
const Barang = require('../models/barang')
const express = require("express");
const router = express.Router();
const cors = require("cors");
const bcryptjs = require("bcryptjs");
router.use(cors())

router.post('/register',async (req, res) => {
    const today = new Date();
    const date = today.getDate()+(today.getMonth()+1)+today.getFullYear();
    const email = req.body.email;
    const name = req.body.nama;
    const password = req.body.password;
    const confirm = req.body.confirm;
    const address = req.body.address;
    const phonenum = req.body.phonenum;
    
    //hashing password
    const hashPassword = await bcryptjs.hash(password,10);

    Customer.count ({id_cust: { $regex: '.*' + date + '.*' }}, function (err,res2){
        const id_cust = "CU"+date+Number(res2+1)
        Customer.count({email : email} , async function (error,result){
            if (result == 0) {
                if (password == confirm) {
                    const customer = new Customer({
                        id_cust: id_cust,
                        nama: name,
                        poin: 0,
                        email: email,
                        password: hashPassword,
                        notlp: phonenum,
                        alamat: address,
                        status: 0,
                    });
                    customer.save(function (err, book) {
                        if (err) return console.error(err);
                        console.log("Created");
                    });
                    return res.status(200).send("Berhasil Register");
                }
            }
            else
            {
                return res.status(400).send("Email sudah terdaftar");
            }
        });
    })
})

router.post('/login',async (req, res) => {
    const email = req.body.email;
    const inputPassword = req.body.password;
    
    const customer = await Customer.findOne({email: email});
    if(customer){
        if(bcryptjs.compareSync(inputPassword,customer['password'])){
            console.log("berhasil login");
            return res.status(201).send({customer:customer});
        }
        else{
            console.log("gagal login");
        }
    }
    else{
        //login buat admin
        const Pegawai = await pegawai.findOne({email: email});
        
    }
    
})
router.post('/addMember', async (req,res) => {
    const jenis_member = new Jenis_member(
        {
            id_member: "1",
            nama: "member biasa",
            minimal_poin: 10,
            potongan: 10000
        }
    );
    jenis_member.save(function (e, a) {
        if (e) return console.error(e);
        console.log("Created");
    });
})
router.post('/test', async (req,res) => {
    const customer = await Customer.findOne({email: req.body.email }).populate('member');
    return res.status(200).send({"customer" : customer});
})
router.post('/testInsert', async (req,res) => {
    const isi = new Barang(
        {
            id_barang: '0',
            nama: 'Tjung',
            harga: 10,
            stok: 50,
            gambar: 'https://assets.logitech.com/assets/65479/2/c922-pro-hd-webcam-refresh.png',
            status: 1 ,
            kategori: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "kategori",
                    required: true
                },
    brand: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "brand",
                required: true
            },
            review: [{
            type: {
            id_review: {type: String, required: true},
            comment: {type: String, required: true},
            rating: {type: String, required: true},
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "customer",
                required: true
            }
        },
        required: false    
    }]
        }
    );
    const barang = await Barang.insertMany({email: req.body.email });
    return res.status(200).send({"customer" : customer});
})
router.get('/register',async (req, res) => {
    const email =req.body.email;
    console.log("test");
    //return res.status(200).send(email);
})

module.exports = router