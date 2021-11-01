const mongoose = require('mongoose')
const express = require("express");
const cors = require('cors')
const app = express();
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

const routes = require('./routes/route')
app.use("/",routes);
app.listen(3001, () => console.log('Running on port 3001'));
