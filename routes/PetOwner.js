const express = require('express');
const router = express.Router();
const { PetOwner, Cat, Treatment, Payment} = require('../Database/Model_Clinic');

router.get('/', async (req, res) => {
    const petOwner = await PetOwner.find();
    res.render('PetOwner', {petOwner});
});

router.post('/', async (req, res) => {
    const add_PetOwner = req.body;
    const petOwner = new PetOwner(add_PetOwner);
    await petOwner.save();
    res.json(petOwner)
});

module.exports = router;