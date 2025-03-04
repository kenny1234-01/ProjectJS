const express = require('express');
const router = express.Router();
const { PetOwner, Cat, Treatment, Payment} = require('../Database/Model_Clinic');

router.get('/', async (req, res) => {
    const payments = await Payment.find().sort({ _id: -1 });
    const totalPayment = await Payment.aggregate([
        {
          $group: {
            _id: null, // ไม่ต้องการจัดกลุ่ม ให้รวมทั้งหมด
            total: { $sum: "$Payment" } // รวมค่าทั้งหมดของฟิลด์ Payment
          }
        }
    ]);
    const paymentTotal = totalPayment[0]?.total || 0;
    res.render('Payment', {payments, paymentTotal});
});

router.post('/:id', async (req, res) => {
    const latestcat = req.params.id;
    const OwnerID = await Cat.findOne({ID_Cat: latestcat});
    const add_payment = { ...req.body, ID_Cat: latestcat };
    const payment = await Treatment.findOne({ID_Cat: latestcat});
    const ID_Payment = latestcat.replace("CS", "P");
    const date = new Date();
    const formattedDate = date.toLocaleDateString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const AddPayment = new Payment({ID_Payment: ID_Payment, ...add_payment, Payment_Date: formattedDate, Payment: payment.Payment});
    await AddPayment.save();
    res.redirect(`/EditAll/${OwnerID.ID_Pet_Owner}`);
});

router.put('/:id', async (req, res) => {
    const ID_Payment = req.params.id;
    const checkPayment  = await Payment.findOne({ ID_Payment: ID_Payment })
    const UpPayment = await Treatment.findOne({ ID_Cat: checkPayment.ID_Cat })
    const UpdatePayment = {...req.body , Payment: UpPayment.Payment };
    const updatedPayment = await Payment.findOneAndUpdate({ ID_Payment: ID_Payment }, UpdatePayment, { new: true });
    res.json(updatedPayment);
});

router.delete('/:id', async (req, res) => {
    const ID_Payment = req.params.id;
    await Payment.deleteOne({ ID_Payment: ID_Payment });
    res.json({});
});

router.get('/', async (req, res) => {
    const paymentSummary = await Payment.aggregate([
        {
            $group: {
                Payment_Date: "$Payment_Date",  // จัดกลุ่มตามวันที่
                totalCats: { $sum: 1 },  // นับจำนวนแมว
                Payment: { $sum: "$Payment" }  // รวมค่ารักษา
            }
        },
        { $sort: { _id: -1 } } // เรียงวันที่ใหม่ล่าสุดขึ้นก่อน
    ]);
    res.render('Treatment', {payment});
});

module.exports = router;