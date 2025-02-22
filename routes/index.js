const express = require('express');
const router = express.Router();
const { PetOwner, Cat, Treatment, Payment} = require('../Database/Model_Clinic');

router.get('/', async (req, res) => {
    const petOwner = await PetOwner.find();
    res.render('index', {petOwner});
});

router.get('/app', async (req, res) => {
    const petOwner = await PetOwner.find();
    res.render('appClinic', {petOwner});
});

router.get('/PostOwnerCat', async (req, res) => {
    res.render('formOnerCat');
});

module.exports = router;