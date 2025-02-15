const express = require('express');
const router = express.Router();
const { PetOwner, Cat, Treatment, Payment} = require('../Database/Model_Clinic');

router.get('/', async (req, res) => {
    const cats = await Cat.find();
    res.json(cats);
});

router.post('/:id', async (req, res) => {
    const latestPetOwner = req.params.id;
    const add_cats = { ...req.body, ID_Pet_Owner: latestPetOwner };

    let newIdcat = latestPetOwner.replace("PO", "CS");

    const cats = new Cat({ID_Cat: newIdcat, ...add_cats});
    await cats.save();
    res.json(cats);
});

router.put('/:id', async (req, res) => {
    const catId = req.params.id
    const UpdateCat = req.body;
    const Catupdate = await PetOwner.findOneAndUpdate({ ID_Pet_Owner: catId }, UpdateCat, { new: true });
    res.json(Catupdate);
});

router.delete('/:id', async (req, res) => {
    const catId = req.params.id
    await Cat.deleteOne({ ID_Pet_Owner: catId });
    res.json({});
});

module.exports = router;