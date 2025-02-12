const express = require('express');
const router = express.Router();
const { PetOwner, Cat, Treatment, Payment} = require('../Database/Model_Clinic');

router.get('/', async (req, res) => {
    const payments = await Payment.find();
    res.render('Payment', {payments});
});

router.post('/', async (req, res) => {
    const add_payment = req.body;
    const payments = new Payment(add_payment);
    await payments.save();
    res.json(payments)
});

module.exports = router;