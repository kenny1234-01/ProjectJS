const express = require('express');
const router = express.Router();
const { PetOwner, Cat, Treatment, Payment} = require('../Database/Model_Clinic');

router.get('/', async (req, res) => {
    const petOwner = await PetOwner.find().sort({ _id: -1 });
    res.render('PetOwner', {petOwner});
});

router.post('/', async (req, res) => {
    const add_PetOwner = req.body;
    const lastOwner = await PetOwner.findOne().sort({ID_Pet_Owner: -1});
    let newId = "PO001";
    if (lastOwner) {
        const lastIdNum = parseInt(lastOwner.ID_Pet_Owner.replace("PO", ""), 10);
        newId = `PO${String(lastIdNum + 1).padStart(3, "0")}`;
    }
    const petOwner = new PetOwner({ID_Pet_Owner: newId, ...add_PetOwner});
    await petOwner.save();
    res.render('formCat', {petOwner});
});

router.put('/:id', async (req, res) => {
    const petOwnerId = req.params.id;
    const UpdateOwner = req.body;
    const updatedOwner = await PetOwner.findOneAndUpdate({ ID_Pet_Owner: petOwnerId }, UpdateOwner, { new: true });
    res.json(updatedOwner);
});

router.delete('/:id', async (req, res) => {
    const petOwnerId = req.params.id
    await PetOwner.deleteOne({ ID_Pet_Owner: petOwnerId });
    await Cat.deleteOne({ ID_Pet_Owner: petOwnerId });
    res.json({});
});

module.exports = router;