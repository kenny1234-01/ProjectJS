const mongoose = require('mongoose');

const Model_PetOwner = mongoose.Schema({
    ID_Pet_Owner: String,
    NamePet_Owner: String,
    LastNamePet_Owner: String,
    PhoneNumber: String
});

const PetOwner = mongoose.model('petowners', Model_PetOwner);

const Model_Cat = mongoose.Schema({
    ID_Cat: String,
    Cat_Gender: String,
    Cat_Species: String,
    Cat_Age: String,
    Cat_Name: String,
    ID_Pet_Owner: String
});

const Cat = mongoose.model('cats', Model_Cat);

const Model_Treatment = mongoose.Schema({
    ID_Treatment: String,
    ID_Cat: String,
    Cat_symptoms: String,
    Cat_status: String,
    Treatment_Date: String,
    Payment: Number
});

const Treatment = mongoose.model('treatments', Model_Treatment);

const Model_Payment = mongoose.Schema({
    ID_Payment: String,
    ID_Cat: String,
    Payment_Date: String,
    Medicine_fake_away: String,
    Payment: Number
});

const Payment = mongoose.model('payments', Model_Payment);

module.exports = { PetOwner, Cat, Treatment, Payment};