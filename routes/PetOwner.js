const express = require('express');
const router = express.Router();
const { PetOwner, Cat, Treatment, Payment} = require('../Database/Model_Clinic');

router.get('/', async (req, res) => {
    const petOwner = await PetOwner.find();
    res.json(petOwner);
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
    res.json(petOwner)
});

module.exports = router;