const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.json());

mongoose.connect('mongodb+srv://s6406021610046:h61oP17zkVTIpBsb@cluster0.4vjel.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log("Connected to MongoDB");
}).catch(() => {
    console.log("Error connecting to MongoDB:", error);
})

const indexPage = require('./routes/index');
const CatPage = require('./routes/Cat');
const PetOwnerPage = require('./routes/PetOwner');
const TreatmentPage = require('./routes/Treatment');
const PaymentPage = require('./routes/Payment');

app.use('/', indexPage);
app.use('/cat', CatPage);
app.use('/PetOwner', PetOwnerPage);
app.use('/Treatment', TreatmentPage);
app.use('/Payment', PaymentPage);

app.listen(PORT, () => {
    console.log(`App Running to http://localhost:${PORT}`);
})