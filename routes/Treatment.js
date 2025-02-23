const express = require('express');
const router = express.Router();
const { PetOwner, Cat, Treatment, Payment} = require('../Database/Model_Clinic');

router.get('/', async (req, res) => {
    const treatments = await Treatment.find();
    res.render('Treatment', {treatments});
});

router.post('/:id', async (req, res) => {
    const latestcat = req.params.id;
    const add_treatment = { ...req.body, ID_Cat: latestcat };
    const ID_Treatment = latestcat.replace("CS", "T");
    const date = new Date();
    const formattedDate = date.toLocaleDateString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const treatments = new Treatment({ID_Treatment: ID_Treatment, ...add_treatment, Treatment_Date: formattedDate});
    await treatments.save();
    res.json(treatments)
});

router.put('/:id', async (req, res) => {
    const ID_Treatment = req.params.id;
    const UpdateTreatment = req.body;
    const updatedTreatment = await Treatment.findOneAndUpdate({ ID_Treatment: ID_Treatment }, UpdateTreatment, { new: true });
    res.json(updatedTreatment);
});

router.delete('/:id', async (req, res) => {
    const ID_Treatment = req.params.id;
    await Treatment.deleteOne({ ID_Treatment: ID_Treatment });
    res.json({});
});

module.exports = router;