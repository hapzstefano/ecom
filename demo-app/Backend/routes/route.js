const Customer = require('../models/customer')
const Jenis_member = require('../models/jenis_member')
const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors())

router.post('/register',async (req, res) => {
    const today = new Date();
    const date = today.getDate()+(today.getMonth()+1)+today.getFullYear();
    const email = req.body.email;
    const nama = req.body.nama;
    const password = req.body.password;
    const confirm = req.body.confirm;
    const address = req.body.address;
    Customer.count ({id_cust: { $regex: '.*' + date + '.*' }}, function (err,res2){
        const id_cust = "CU"+date+Number(res2+1)
        Customer.count({email : email} , async function (error,result){
            if (result == 0) {
                if (password == confirm) {
                    const customer = new Customer(
                        {
                            id_cust: id_cust,
                            nama: nama,
                            poin: 0,
                            email: email,
                            password: password,
                            alamat: address,
                            status: 0,
                        }
                    );
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

router.get('/register',async (req, res) => {
    return res.status(200).send("aaaaaaa");
})

module.exports = router