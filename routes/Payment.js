const express = require('express');
const router = express.Router();
const { PetOwner, Cat, Treatment, Payment} = require('../Database/Model_Clinic');

router.get('/', async (req, res) => {
    const payments = await Payment.find();
    res.render('Payment', {payments});
});

router.post('/:id', async (req, res) => {
    const latestcat = req.params.id;
    const add_payment = { ...req.body, ID_Cat: latestcat };
    const ID_Payment = latestcat.replace("CS", "P");
    const date = new Date();
    const formattedDate = date.toLocaleDateString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const AddPayment = new Payment({ID_Payment: ID_Payment, ...add_payment, Payment_Date: formattedDate});
    await AddPayment.save();
    res.json(AddPayment)
});

router.put('/:id', async (req, res) => {
    const ID_Payment = req.params.id;
    const UpdatePayment = req.body;
    const updatedPayment = await Payment.findOneAndUpdate({ ID_Payment: ID_Payment }, UpdatePayment, { new: true });
    res.json(updatedPayment);
});

router.delete('/:id', async (req, res) => {
    const ID_Payment = req.params.id;
    await Payment.deleteOne({ ID_Payment: ID_Payment });
    res.json({});
});

module.exports = router;