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
    const lastCat = await Cat.findOne().sort({ID_Cat: -1});
    let newIdcat = "CS001";
    if (lastCat) {
        const lastIdNum = parseInt(lastCat.ID_Cat.replace("CS", ""), 10);
        newIdcat = `CS${String(lastIdNum + 1).padStart(3, "0")}`;
    }

    const cats = new Cat({ID_Cat: newIdcat, ...add_cats});
    await cats.save();
    res.json(cats);
});

router.put('/:id', async (req, res) => {
    const catId = req.params.id;
    const UpdateCat = req.body;
    const Catupdate = await PetOwner.findOneAndUpdate({ ID_Cat: catId }, UpdateCat, { new: true });
    res.json(Catupdate);
});

router.delete('/:id', async (req, res) => {
    const catId = req.params.id;
    await Cat.deleteOne({ ID_Cat: catId });
    res.json({});
});

module.exports = router;