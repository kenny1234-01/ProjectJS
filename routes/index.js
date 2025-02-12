const express = require('express');
const router = express.Router();
const { PetOwner, Cat, Treatment, Payment} = require('../Database/Model_Clinic');

router.get('/', async (req, res) => {
    const petOwner = await PetOwner.find();
    res.render('index', {petOwner});
});

module.exports = router;