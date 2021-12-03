const mongoose = require('mongoose')
const express = require("express");
const path = require("path");
const cors = require('cors')
const app = express();
const routes = require('./routes/route')
const admin = require('./routes/admin')
app.use(cors())
mongoose.connect('mongodb+srv://user:user@cluster0.cna0d.mongodb.net/proyek_ecom')
    .then(() => console.log('MongoDB connected…'))
    .catch(err => console.log(err))

require('./models/customer')
require('./models/jenis_member')

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use("/",routes);
app.use('/uploads/barang', express.static(path.join(__dirname, '/uploads/barang')));
app.use('/uploads/brand', express.static(path.join(__dirname, '/uploads/brand')));
app.use('/admin',admin)
app.listen(3001, () => console.log('Running on port 3001'));
