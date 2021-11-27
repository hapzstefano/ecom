const BrandModel = require ('../models/brand')
const BarangModel = require('../models/barang')
const CategoryModel = require('../models/kategori')
const MemberModel = require('../models/jenis_member')
const PromoModel = require('../models/promo')
const PegawaiModel = require('../models/pegawai')
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
        const check = await BarangModel.findOne({_id : req.params._id})
        if (check){
            const barang = await BarangModel.findOneAndUpdate({_id: req.params._id},{
                "nama" : req.body.name,
                "harga": req.body.price,
                "stok": req.body.stok,
                "status":1,
                "kategori": mongoose.Types.ObjectId(category._id) ,
                "brand": mongoose.Types.ObjectId(brand._id)
            })
            callback(null, (req.params._id + '.' + extension));
        }
        else{
            const barang = new BarangModel({
                "nama" : req.body.name,
                "harga": req.body.price,
                "stok": req.body.stok,
                "gambar":"../uploads/barang/",
                "status":1,
                "kategori": mongoose.Types.ObjectId(category._id) ,
                "brand": mongoose.Types.ObjectId(brand._id)
            })
            let _id
            barang.save(async function (err, inserted) {
                if (err) return console.error(err);
                _id = inserted._id
                await BarangModel.findOneAndUpdate({_id : new mongoose.Types.ObjectId(_id)},{gambar: "../uploads/barang/"+_id+"."+extension})
                callback(null, (_id + '.' + extension));
            });
            
        }     
    }
})

const brandStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '../uploads/brand');
    },
    filename: async function(req, file, callback) {
        const extension = file.originalname.split('.')[file.originalname.split('.').length - 1];
        const check = await BrandModel.findOne({nama: req.body.name}) 
        console.log(req.body);
        if (check){
            const brand = await BrandModel.findOneAndUpdate({_id: req.params._id},{
                "nama" : req.body.name,
                "deskripsi": req.body.description,
            })
            callback(null, (req.params._id + '.' + extension));
        }
        else{
            const brand = new BrandModel({
                "nama" : req.body.name,
                "gambar":"../uploads/brand/",
                "deskripsi":req.body.description,
                "status":1,
            })
            let _id
            brand.save(async function (err, inserted) {
                if (err) return console.error(err);
                _id = inserted._id
                await BrandModel.findOneAndUpdate({_id : new mongoose.Types.ObjectId(_id)},{gambar: "../uploads/brand"+_id+"."+extension})
                callback(null, (_id + '.' + extension));
            });          
        }     
    }
})

const uploadBarang = multer({
    storage: barangStorage,
});

const uploadBrand = multer({
    storage: brandStorage,
});


router.post('/addBarang',uploadBarang.single('image'), async (req,res) => { 
    console.log(req.body);
    console.log("file: "+req.file);
    return res.status(200).send("Berhasil Menambah barang")
})

router.post('/addCategory', async (req,res) => { 
    const category = new CategoryModel({
        "nama" : req.body.name,
        "status": 1
    })
    category.save(async function (err, inserted) {
        if (err) return console.error(err);
        return res.status(200).send("Berhasil Menambah Category")
    });        
})

router.post('/addBrand', uploadBrand.single('image'), async (req,res) => { 
    return res.status(200).send("Berhasil Menambah brand")
})

router.post('/updateBrand/:_id',uploadBrand.single('image'), async (req,res) => {
    return res.status(200).send("Berhasil Mengubah Brand")
})

router.post('/updateBarang/:_id',uploadBarang.single('image'), async (req,res) => {
    return res.status(200).send("Berhasil Mengubah Barang")
})

router.post('/updateCategory/:_id', async (req,res) => {
    const category = await CategoryModel.findOneAndUpdate({_id: req.params._id},{
        "nama" : req.body.name,
    })
    if (!category)
    return res.status(400).send('Category tidak ditemukan')
    return res.status(200).send('Berhasil update Category')
})

router.post('/deleteBarang/:_id', async (req,res) => {
    const barang = await BarangModel.findOneAndUpdate({_id: req.params._id},{
       "status": 0
    })
    return res.status(200).send("Berhasil Delete Barang")
})

router.post('/deleteCategory/:_id', async (req,res) => {
    const category = await CategoryModel.findOneAndUpdate({_id: req.params._id},{
       "status": 0
    })
    if (category)
        return res.status(200).send("Berhasil Delete Barang")
    return res.status(200).send("Barang tidak ditemukan")
})

router.post('/deleteBrand/:_id', async (req,res) => {
    const brand = await BrandModel.findOneAndUpdate({_id: req.params._id},{
       "status": 0
    })
    if (brand)
        return res.status(200).send("Berhasil Delete brand")
    return res.status(200).send("Brand tidak ditemukan")
})

router.get('/getAllBarang', async (req,res)=>{
    //const barang = await BarangModel.find();
    const barang = await BarangModel.aggregate([
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
                  localField: "kategori",
                  foreignField: "_id",
                  as: "categorys"
              }
          },
          {
            $sort:{name: 1}
          }
        ])
    return res.status(200).json(barang)
})

router.get('/getAllCategory', async (req,res)=>{
    const category = await CategoryModel.find({status:1});
    return res.status(200).json(category)
})

router.get('/getAllBrand', async (req,res)=>{
    const brand = await BrandModel.find({status:1});
    return res.status(200).json(brand)
})

router.get('/getCategory/:_id', async (req,res)=>{
    const category = await CategoryModel.findOne({_id: req.params._id});
    if(category){
        return res.status(200).json(category)
    }else{
        return res.status(404).send("Data Tidak Ditemukan");
    }
})

router.get('/getBarang/:_id',async (req,res) => {
    const barang = await BarangModel.findOne({_id: req.params._id});
    if(barang){
        return res.status(200).json(barang)
    }else{
        return res.status(404).send("Data Tidak Ditemukan");
    }
})

router.get('/getBrand/:_id',async (req,res) => {
    const brand = await BrandModel.findOne({_id: req.params._id});
    if(brand){
        return res.status(200).json(brand)
    }else{
        return res.status(404).send("Data Tidak Ditemukan");
    }
})


router.post('/addMember',async (req,res) => {
    console.log(req.body.nama);
    const dataMember = await MemberModel.find({nama: req.body.nama});
    if(dataMember.length != 0){
        return res.status(400).send("Nama tidak boleh kembar")
    }else{
        const newMember = new MemberModel({
            "nama" : req.body.nama,
            "minimal_poin": req.body.minim_poin,
            "potongan":  req.body.potongan,
            "status": 1
        })
        newMember.save(async function (err, inserted) {
            if (err) return console.error(err);
        });
    
        return res.status(200).send("Berhasil Menambah Member")
    }
})

router.post('/updateMember/:id', async (req,res) =>{
    const idMember = req.params.id;
    const namaBaru = req.body.nama;
    const minimPoinBaru = req.body.minim_poin;
    const potonganBaru = req.body.potongan;
    const dataMember = await MemberModel.findOne({_id: new mongoose.Types.ObjectId(idMember)});
    if(dataMember){
        await MemberModel.findOneAndUpdate(
            {_id: new mongoose.Types.ObjectId(idMember)},
            {
                "nama": namaBaru,
                "minimal_poin": minimPoinBaru,
                "potongan" : potonganBaru
            }
        );
        return res.status(200).send("Berhasil Update Member")
    }else{
        return res.status(404).send("Data Member tidak ditemukan")
    }
})

router.post('/deleteMember/:idMemberDelete', async (req,res) =>{
    const idMemberDelete = req.params.idMemberDelete
    const dataMember = await MemberModel.findOne({_id: new mongoose.Types.ObjectId(idMemberDelete)});
    if(dataMember){
        await MemberModel.findOneAndUpdate(
            {_id: new mongoose.Types.ObjectId(idMemberDelete)},
            {
                "status" : 0
            }
        );
        return res.status(200).send("Berhasil Delete Member")
    }else{
        return res.status(404).send("Data Member tidak ditemukan")
    }
})

router.get('/getAllMember', async (req,res)=>{
    const dataMember = await MemberModel.find({status:1});
    return res.status(200).json(dataMember)
})

router.get('/getMemberByName/:nama', async (req,res)=>{
    const dataMember = await MemberModel.findOne({nama: req.params.nama});
    if(dataMember){
        return res.status(200).json(dataMember)
    }else{
        return res.status(404).send("Data Tidak Ditemukan");
    }
})

router.get('/getMemberById/:id', async (req,res)=>{
    const dataMember = await MemberModel.findOne({_id: new mongoose.Types.ObjectId(req.params.id)});
    if(dataMember){
        return res.status(200).send([{Member: dataMember}])
    }else{
        return res.status(404).send("Data Tidak Ditemukan");
    }
})

router.post('/addPromo',async (req,res) => {
    const dataPromo = await PromoModel.findOne({nama: req.body.namaPromo});
    if(dataPromo){
        return res.status(400).send("Nama tidak boleh kembar")
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

router.post('/updatePromo/:idPromo', async (req,res) =>{
    const idpromo = req.params.idPromo
    const namaBaru = req.body.namaPromo
    const tglAwalBaru = req.body.tglAwalPromo
    const tglAkhirBaru = req.body.tglAkhirPromo
    const potonganBaru = req.body.potongan
    const dataPromo = await PromoModel.findOne({_id: new mongoose.Types.ObjectId(idpromo)});
    if(dataPromo){
        await PromoModel.findOneAndUpdate(
            {_id: new mongoose.Types.ObjectId(idpromo)},
            {
                "nama": namaBaru,
                "tanggal_awal": new Date(tglAwalBaru),
                "tanggal_akhir": new Date(tglAkhirBaru),
                "potongan": potonganBaru
            }
        );
        return res.status(200).send("Berhasil Update Promo")
    }else{
        return res.status(404).send("Data Promo tidak ditemukan")
    }
    
})

router.post('/deletePromo/:idpromoDelete', async (req,res) =>{
    const idPromoDelete = req.params.idpromoDelete
    const dataPromo = await PromoModel.findOne({_id: new mongoose.Types.ObjectId(idPromoDelete)});
    if(dataPromo){
        await PromoModel.findOneAndUpdate(
            {_id: new mongoose.Types.ObjectId(idPromoDelete)},
            {
                "status": 0
            }
        );
        return res.status(200).send("Berhasil Delete Promo")
    }else{
        return res.status(404).send("Data Promo tidak ditemukan")
    }
})

router.get('/getAllPromo', async (req,res)=>{
    const dataPromo = await PromoModel.find({status:1});
    return res.status(200).json(dataPromo)
})

router.get('/getPromoByName/:nama', async (req,res)=>{
    const dataPromo = await PromoModel.findOne({nama: req.params.nama});
    if(dataPromo){
        return res.status(200).json(dataPromo)
    }else{
        return res.status(404).send("Data Tidak Ditemukan");
    }
})

router.get('/getPromoById/:id', async (req,res)=>{
    const dataPromo = await PromoModel.findOne({_id: new mongoose.Types.ObjectId(req.params.id)});
    if(dataPromo){
        return res.status(200).send([{Promo: dataPromo}])
    }else{
        return res.status(404).send("Data Tidak Ditemukan");
    }
})

//master pegawai/employee
router.get('/getAllPegawai', async (req,res)=>{
    const dataPegawai = await PegawaiModel.find({status:1});
    return res.status(200).json(dataPegawai)
})
router.post('/addPegawai',async (req,res) => {
    const dataPegawai = await PegawaiModel.findOne({nama: req.body.nama});
    console.log(req.body);
    if(dataPegawai){
        return res.status(400).send("Nama tidak boleh kembar")
    }else{
        let jenis= 1;
        if(req.body.jenis == "employee"){
            jenis = 2;
        }
        const newPegawai = new PegawaiModel({
            "nama" : req.body.nama,
            "email": req.body.email,
            "password": req.body.password,
            "notlp": req.body.notlp,
            "jenis": jenis,
            "status": 1
        })
        newPegawai.save(async function (err, inserted) {
            if (err) return console.error(err);
        });

        return res.status(200).send("Berhasil Menambah Pegawai")
    }
})

router.post('/updatePegawai/:idPegawai', async (req,res) =>{
    const idpegawai = req.params.idPegawai;
    const nama = req.body.nama;
    const email = req.body.email;
    const password = req.body.password;
    const notlp = req.body.notlp;
    let jenis= 1;
    if(req.body.jenis == "employee"){
        jenis = 2;
    }
    const dataPegawai = await PegawaiModel.findOne({_id: new mongoose.Types.ObjectId(idpegawai)});
    if(dataPegawai){
        await PegawaiModel.findOneAndUpdate(
            {_id: new mongoose.Types.ObjectId(idpegawai)},
            {
                "nama": nama,
                "email": email,
                "password": password,
                "notlp": notlp,
                "jenis": jenis,
            }
        );
        return res.status(200).send("Berhasil Update Pegawai");
    }else{
        return res.status(404).send("Data Pegawai tidak ditemukan");
    }
    
})

router.post('/deletePegawai/:idpegawai', async (req,res) =>{
    const idPegawaiDelete = req.params.idpegawai;
    const dataPegawai = await PegawaiModel.findOne({_id: new mongoose.Types.ObjectId(idPegawaiDelete)});
    if(dataPegawai){
        await PegawaiModel.findOneAndUpdate(
            {_id: new mongoose.Types.ObjectId(idPegawaiDelete)},
            {
                status: 0
            }
        );
        return res.status(200).send("Berhasil Delete Pegawai")
    }else{
        return res.status(404).send("Data Pegawai tidak ditemukan")
    }
})
module.exports = router