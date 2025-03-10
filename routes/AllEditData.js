const express = require('express');
const router = express.Router();
const axios = require('axios')
const { PetOwner, Cat, Treatment, Payment} = require('../Database/Model_Clinic');

router.get('/:id', async (req, res) => {
    const Owner = await PetOwner.find({ ID_Pet_Owner: req.params.id });
    const Allcats = await Cat.find({ ID_Pet_Owner: req.params.id });
    let AllTreatment = [];
    let AllPayment = [];

    const treatmentsPromises = Allcats.map(cats => Treatment.find({ ID_Cat: cats.ID_Cat }));
    const paymentsPromises = Allcats.map(cats => Payment.find({ ID_Cat: cats.ID_Cat }));
    const TreatmentResults = await Promise.all(treatmentsPromises);
    const PaymentResults = await Promise.all(paymentsPromises);
    AllTreatment = TreatmentResults.flat();
    AllPayment = PaymentResults.flat();
    res.render('AllEditData', {Owner, Allcats, AllTreatment, AllPayment});
});

router.get('/AddCat/:id', async (req, res) => {
    const IdOwner = req.params.id;
    const petOwner = await PetOwner.findOne({ ID_Pet_Owner: IdOwner });
    res.render('formCat', { petOwner })
});

router.get('/AddTreatment/:id', async (req, res) => {
    const IdCat = req.params.id;
    const cat = await Cat.findOne({ ID_Cat: IdCat });
    res.render('formTreatment', { cat });
});

router.get('/AddPayment/:id', async (req, res) => {
    const IdCat = req.params.id;
    const cat = await Cat.findOne({ ID_Cat: IdCat });
    res.render('formPayment', { cat });
});

//เจ้าของ
// แก้ไขเจ้าของแมว
router.get('/EditOwder/:id', async (req, res) => {
    const IdOwner = req.params.id;
    const petOwner = await PetOwner.findOne({ ID_Pet_Owner: IdOwner });
    res.render('EditOwder', { petOwner })
});
router.post('/EditOwder/:id', async (req, res) => {
    const IdOwner = req.params.id;
    const DataOwder = req.body;
    await axios.put(`http://localhost:5000/PetOwner/${IdOwner}`, DataOwder);
    res.redirect(`/EditAll/${IdOwner}`);
});

//แมว
// แก้ไขแมว
router.get('/EditCat/:id', async (req, res) => {
    const Idcat = req.params.id;
    const cat = await Cat.findOne({ ID_Cat: Idcat });
    res.render('EditCat', { cat })
});
router.post('/EditCat/:id', async (req, res) => {
    const Idcat = req.params.id;
    const IdOwner = await Cat.findOne({ ID_Cat: Idcat });
    const DataCat = req.body;
    await axios.put(`http://localhost:5000/cat/${Idcat}`, DataCat);
    res.redirect(`/EditAll/${IdOwner.ID_Pet_Owner}`);
});
//ลบแมว
router.get('/deleteCat/:id', async (req, res) => {
    const IdOwner = await Cat.findOne({ ID_Cat: req.params.id });
    await axios.delete(`http://localhost:5000/cat/${req.params.id}`);
    res.redirect(`/EditAll/${IdOwner.ID_Pet_Owner}`);
});

//รายการรักษา
// แก้ไขรายการรักษา
router.get('/EditTreatment/:id', async (req, res) => {
    const IdTreat = req.params.id;
    const treatment = await Treatment.findOne({ ID_Treatment: IdTreat });
    res.render('EditTreatment', { treatment });
});
router.post('/EditTreatment/:id', async (req, res) => {
    const IdTreatment = req.params.id;
    const treatment = await Treatment.findOne({ ID_Treatment: IdTreatment });
    const cat = await Cat.findOne({ ID_Cat: treatment.ID_Cat });
    const IdOwner = cat.ID_Pet_Owner;
    const DataTreatment = req.body;
    await axios.put(`http://localhost:5000/Treatment/${IdTreatment}`, DataTreatment);
    res.redirect(`/EditAll/${IdOwner}`);
});
// ลบรายการรักษา
router.get('/deleteTreatments/:id', async (req, res) => {
    const IdCat = await Treatment.findOne({ ID_Treatment: req.params.id });
    const IdOwner = await Cat.findOne({ ID_Cat: IdCat.ID_Cat });
    await axios.delete(`http://localhost:5000/Treatment/${req.params.id}`);
    res.redirect(`/EditAll/${IdOwner.ID_Pet_Owner}`);
});

//บิล
// แก้ไขบิล
router.get('/EditPayment/:id', async (req, res) => {
    const IdPayment = req.params.id;
    const payment = await Payment.findOne({ ID_Payment: IdPayment });
    res.render('EditPayment', { payment });
});
router.post('/EditPayment/:id', async (req, res) => {
    const Idpayment = req.params.id;
    const payment = await Payment.findOne({ ID_Payment: Idpayment });
    const cat = await Cat.findOne({ ID_Cat: payment.ID_Cat });
    const IdOwner = cat.ID_Pet_Owner;
    const Datapayment = req.body;
    await axios.put(`http://localhost:5000/Payment/${Idpayment}`, Datapayment);
    res.redirect(`/EditAll/${IdOwner}`);
});
//ลบบิล
router.get('/deletePayments/:id', async (req, res) => {
    const IdCat = await Payment.findOne({ ID_Payment: req.params.id });
    const IdOwner = await Cat.findOne({ ID_Cat: IdCat.ID_Cat });
    await axios.delete(`http://localhost:5000/Payment/${req.params.id}`);
    res.redirect(`/EditAll/${IdOwner.ID_Pet_Owner}`);
});

// ลบข้อมูลทั้งหมด
router.get('/deleteAllCase/:id', async (req, res) => {
    const idOwner = req.params.id;
    await axios.delete(`http://localhost:5000/EditAll/deleteAllCase/${idOwner}`);
    res.redirect(`/app`);
})
router.delete('/deleteAllCase/:id', async (req, res) => {
    const idOwner = req.params.id;
    const idcat = await Cat.find({ID_Pet_Owner: idOwner});
    const catIds = idcat.map(cats => cats.ID_Cat);
    await Payment.deleteMany({ ID_Cat: { $in: catIds } });
    await Treatment.deleteMany({ ID_Cat: { $in: catIds } });
    await Cat.deleteMany({ ID_Pet_Owner: { $in: idOwner } });
    await PetOwner.deleteOne({ ID_Pet_Owner: idOwner });
    res.json({});
});

module.exports = router;