const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

mongoose.connect('mongodb+srv://s6406021610046:h61oP17zkVTIpBsb@cluster0.4vjel.mongodb.net/Clinic?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log("Connected to MongoDB");
}).catch(() => {
    console.log("Error connecting to MongoDB:", error);
})

const indexPage = require('./routes/index');
const CatPage = require('./routes/Cat');
const PetOwnerPage = require('./routes/PetOwner');
const TreatmentPage = require('./routes/Treatment');
const PaymentPage = require('./routes/Payment');
const EditAll = require('./routes/AllEditData')

app.use('/', indexPage);
app.use('/cat', CatPage);
app.use('/PetOwner', PetOwnerPage);
app.use('/Treatment', TreatmentPage);
app.use('/Payment', PaymentPage);
app.use('/EditAll', EditAll);

app.listen(PORT, () => {
    console.log(`App Running to http://localhost:${PORT}`);
});