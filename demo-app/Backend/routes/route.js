'use strict'
const Customer = require('../models/customer')
const CategoryModel = require('../models/kategori')
const Pegawai = require('../models/pegawai')
const Jenis_member = require('../models/jenis_member')
const Barang = require('../models/barang')
const Brand = require ('../models/brand')
const express = require("express");
const router = express.Router();
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const multer = require("multer");
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
            return res.status(201).send({customer:customer, status:"customer"});
        }
        else{
            console.log("gagal login");
        }
    }
    else{
        //login buat admin, untuk admin jenis = 2
        const pegawai = await Pegawai.findOne({email: email});
        if(pegawai){
            console.log("berhasil login");
            if(pegawai.jenis == 2){
                return res.status(201).send({customer:customer, status:"admin"});
            }
            else{
                return res.status(201).send({customer:customer, status:"manager"});
            }
        }
        else{
            console.log("gagal login");
        }
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
router.post('/addBarang', async (req,res) => {
    const name = req.body.name
    const brand = await Brand.findOne({nama: req.body.brand}) ;
    const brandId = brand._id
    const category = await category.findOne({nama: req.body.category})
    const categoryId = category._id
    Barang.save ()
})
   

router.post('/test', async (req,res) => {
    const barang = await Barang.find().populate('brands');
    const post = await Barang.aggregate([
        {
          $lookup:
            {
              from: "brands",
              localField: "brand",
              foreignField: "_id",
              as: "brands"
            }
        },
        {
            $lookup:
            {
                from: "category",
                localField: "id_kategori",
                foreignField: "_id",
                as: "categorys"
            }
        },
        {
          $sort:{name: 1}
        }
      ])
    //const hasil = post[0].barangs[0].nama;
    return res.status(200).send({post});
})
router.post('/testInsert', async (req,res) => {
    const barang = await Barang.insertMany({email: req.body.email });
    return res.status(200).send({"customer" : customer});
})
router.get('/register',async (req, res) => {
    const email =req.body.email;
    console.log("test");
    //return res.status(200).send(email);
})

module.exports = router