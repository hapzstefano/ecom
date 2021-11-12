const BrandModel = require ('../models/brand')
const BarangModel = require('../models/barang')
const CategoryModel = require('../models/kategori')
const MemberModel = require('../models/jenis_member')
const PromoModel = require('../models/promo')
const express = require('express');
const router = express.Router();
const cors = require('cors');
const moment = require('moment');
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

router.post('/addMember',async (req,res) => {
    const dataMember = await MemberModel.findOne([{nama: req.body.nama}]);
    if(dataMember){
        return res.status(400).send("Nama tidak boleh kembar")
    }else{
        const newMember = new MemberModel({
            "nama" : req.body.nama,
            "minimal_poin": req.body.minim_poin,
            "potongan": req.body.potongan
        })
        newMember.save(async function (err, inserted) {
            if (err) return console.error(err);
        });
    
        return res.status(200).send("Berhasil Menambah Member")
    }
})

router.put('/updateMember', async (req,res) =>{
    const idMember = req.body.id
    const namaBaru = req.body.namaBaru
    const minimPoinBaru = req.body.minimPoinBaru
    const potonganBaru = req.body.potonganBaru
    const dataMember = await MemberModel.findOne([{_id: new mongoose.Types.ObjectId(idMember)}]);
    if(dataMember){
        const dataMemberUpdate = await MemberModel.findOneAndUpdate({_id : new mongoose.Types.ObjectId(idMember)})
        dataMemberUpdate.nama = namaBaru;
        dataMemberUpdate.minimal_poin = minimPoinBaru;
        dataMemberUpdate.potongan = potonganBaru;
        dataMemberUpdate.save(async function (err, inserted) {
            if (err) return console.error(err);
        });
        return res.status(200).send("Berhasil Update Member")
    }else{
        return res.status(404).send("Data Member tidak ditemukan")
    }
    
})

router.delete('/deleteMember', async (req,res) =>{
    const idMemberDelete = req.body.idMemberDelete
    const dataMember = await MemberModel.findOne([{_id: new mongoose.Types.ObjectId(idMemberDelete)}]);
    if(dataMember){
        const dataMemberDelete = await MemberModel.findOneAndDelete({_id : new mongoose.Types.ObjectId(idMemberDelete)})
        return res.status(200).send("Berhasil Delete Member")
    }else{
        return res.status(404).send("Data Member tidak ditemukan")
    }
})

router.get('/getAllMember', async (req,res)=>{
    const dataMember = await MemberModel.find();
    return res.status(200).json(dataMember)
})

router.get('/getMemberByName', async (req,res)=>{
    const dataMember = await MemberModel.findOne({nama: req.body.nama});
    if(dataMember){
        return res.status(200).json(dataMember)
    }else{
        return res.status(404).send("Data Tidak Ditemukan");
    }
})

router.get('/getMemberById', async (req,res)=>{
    const dataMember = await MemberModel.findOne({_id: new mongoose.Types.ObjectId(req.body.id)});
    if(dataMember){
        return res.status(200).send([{Member: dataMember}])
    }else{
        return res.status(404).send("Data Tidak Ditemukan");
    }
})

router.post('/addPromo',async (req,res) => {
    const dataPromo = await MemberModel.findOne([{nama: req.body.namaPromo}]);
    if(dataPromo){
        return res.status(400).send("Nama Promo tidak boleh kembar")
    }else{
        const newPromo = new PromoModel({
            "nama" : req.body.namaPromo,
            "tanggal_awal": new Date(req.body.tglAwalPromo),
            "tanggal_akhir": new Date(req.body.tglAkhirPromo),
            "potongan": req.body.potongan,
            "status": 1
        })
        newPromo.save(async function (err, inserted) {
            if (err) return console.error(err);
        });
    
        return res.status(200).send("Berhasil Menambah Promo")
    }
})

router.put('/updatePromo', async (req,res) =>{
    const idpromo = req.body.idPromo
    const namaBaru = req.body.namaPromoBaru
    const tglAwalBaru = req.body.tglAwlBaru
    const tglAkhirBaru = req.body.tglAkhrBaru
    const potonganBaru = req.body.potonganPromoBaru
    const statusBaru = req.body.statusPromoBaru
    const dataPromo = await PromoModel.findOne([{_id: new mongoose.Types.ObjectId(idpromo)}]);
    if(dataPromo){
        const dataPromoUpdate = await PromoModel.findOneAndUpdate({_id : new mongoose.Types.ObjectId(idpromo)})
        dataPromoUpdate.nama = namaBaru;
        dataPromoUpdate.tanggal_awal = new Date(tglAwalBaru);
        dataPromoUpdate.tanggal_akhir = new Date(tglAkhirBaru);
        dataPromoUpdate.potongan = potonganBaru;
        dataPromoUpdate.status = statusBaru;
        dataPromoUpdate.save(async function (err, inserted) {
            if (err) return console.error(err);
        });
        return res.status(200).send("Berhasil Update Promo")
    }else{
        return res.status(404).send("Data Promo tidak ditemukan")
    }
    
})

router.delete('/deletePromo', async (req,res) =>{
    const idPromoDelete = req.body.idpromoDelete
    const dataPromo = await PromoModel.findOne([{_id: new mongoose.Types.ObjectId(idPromoDelete)}]);
    if(dataPromo){
        const dataPromoDelete = await PromoModel.findOneAndDelete({_id : new mongoose.Types.ObjectId(idPromoDelete)})
        return res.status(200).send("Berhasil Delete Promo")
    }else{
        return res.status(404).send("Data Promo tidak ditemukan")
    }
})

router.get('/getAllPromo', async (req,res)=>{
    const dataPromo = await PromoModel.find();
    return res.status(200).json(dataPromo)
})

router.get('/getPromoByName', async (req,res)=>{
    const dataPromo = await PromoModel.findOne({nama: req.body.nama});
    if(dataPromo){
        return res.status(200).json(dataPromo)
    }else{
        return res.status(404).send("Data Tidak Ditemukan");
    }
})

router.get('/getPromoById', async (req,res)=>{
    const dataPromo = await PromoModel.findOne({_id: new mongoose.Types.ObjectId(req.body.id)});
    if(dataPromo){
        return res.status(200).send([{Member: dataPromo}])
    }else{
        return res.status(404).send("Data Tidak Ditemukan");
    }
})

module.exports = router