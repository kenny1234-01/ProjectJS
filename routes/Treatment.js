const express = require('express');
const router = express.Router();
const { PetOwner, Cat, Treatment, Payment} = require('../Database/Model_Clinic');

router.get('/', async (req, res) => {
    const treatments = await Treatment.find().sort({ _id: -1 });
    const totalPayment = await Treatment.aggregate([
        {
          $group: {
            _id: null, // ไม่ต้องการจัดกลุ่ม ให้รวมทั้งหมด
            total: { $sum: "$Payment" } // รวมค่าทั้งหมดของฟิลด์ Payment
          }
        }
    ]);
    const payment = totalPayment[0]?.total || 0;
    res.render('Treatment', {treatments, payment});
});

router.post('/:id', async (req, res) => {
    const latestcat = req.params.id;
    const OwnerID = await Cat.findOne({ID_Cat: latestcat});
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
    res.redirect(`/EditAll/${OwnerID.ID_Pet_Owner}`);
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