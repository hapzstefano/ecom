const Customer = require('../models/customer')
const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors())

router.post('/register',async (req, res) => {
    const email = req.body.email;
    const nama = req.body.nama;
    const password = req.body.password;
    const confirm = req.body.conpass;
    const address = req.body.address;
    const checkCustomer = Customer.find({email : email})
    if (checkCustomer)
    {

    }
    if (password == confirm){
        const Customer = new Customer(
            {
                id_cust: 0,
                nama: nama,
                poin: 0,
                email: email,
                password: password,
                alamat: address,
                status: status
            }
            );
        Customer.save(function (err, book) {
            if (err) return console.error(err);
            console.log("Created");
        });
    }

return res.status(200).send("created");
})

router.get('/register',async (req, res) => {
    return res.status(200).send("aaaaaaa");
})

module.exports = router