const BrandModel = require ('../models/brand')
const BarangModel = require('../models/barang')
const CategoryModel = require('../models/kategori')
const express = require('express');
const router = express.Router();
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose')
router.use(cors())

const barangStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '../uploads/barang');
    },
    filename: async function(req, file, callback) {
        const extension = file.originalname.split('.')[file.originalname.split('.').length - 1];
        const brand = await BrandModel.findOne({nama: req.body.brand}) 
        const category = await CategoryModel.findOne({nama: req.body.category})
        const barang = new BarangModel({
            "nama" : req.body.name,
            "harga": req.body.price,
            "stok": req.body.stok,
            "gambar":"../uploads/barang/",
            "status":1,
            "kategori": category._id ,
            "brand": brand._id
        })
        let _id
        barang.save(async function (err, inserted) {
            if (err) return console.error(err);
            _id = inserted._id
            await BarangModel.findOneAndUpdate({_id : new mongoose.Types.ObjectId(_id)},{gambar: "../uploads/barang"+_id+"."+extension})
            callback(null, (_id + '.' + extension));
        });
        
    }
})

const categoryStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '../uploads/category');
    },
    filename: async function(req, file, callback) {
        const extension = file.originalname.split('.')[file.originalname.split('.').length - 1];
        const category = new CategoryModel({
            "nama" : req.body.name,
            "gambar":'../uploads/category/'
        })
        category.save(async function (err, inserted) {
            if (err) return console.error(err);
            _id = inserted._id
            await CategoryModel.findOneAndUpdate({_id : new mongoose.Types.ObjectId(_id)},{gambar: "../uploads/category/"+_id+"."+extension})
            callback(null, (_id + '.' + extension));
        });        
    }
})

const uploadBarang = multer({
    storage: barangStorage,
});

const uploadCategory = multer({
    storage: categoryStorage,
});

router.post('/addBarang',uploadBarang.single('image'), async (req,res) => { 
    return res.status(200).send("Berhasil Menambah barang")
})
router.post('/addCategory',uploadCategory.single('image'), async (req,res) => { 
    return res.status(200).send("Berhasil Menambah Category")
})
module.exports = router