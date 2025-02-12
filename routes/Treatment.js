const express = require('express');
const router = express.Router();
const { PetOwner, Cat, Treatment, Payment} = require('../Database/Model_Clinic');

router.get('/', async (req, res) => {
    const treatments = await Treatment.find();
    res.render('Treatment', {treatments});
});

router.post('/', async (req, res) => {
    const add_treatment = req.body;
    const treatments = new Treatment(add_treatment);
    await treatments.save();
    res.json(treatments)
});

module.exports = router;