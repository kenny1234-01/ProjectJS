const express = require('express');
const router = express.Router();
const { PetOwner, Cat, Treatment, Payment} = require('../Database/Model_Clinic');

router.get('/', async (req, res) => {
    const cats = await Cat.find();
    res.json(cats);
});

router.post('/', async (req, res) => {
    const add_cats = req.body;
    const cats = new Cat(add_cats);
    await cats.save();
    res.json(cats);
});

module.exports = router;