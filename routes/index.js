const express = require('express');
const router = express.Router();
const { PetOwner, Cat, Treatment, Payment} = require('../Database/Model_Clinic');

router.get('/', async (req, res) => {
    res.render('index');
});

router.get('/app', async (req, res) => {
    
    const owners = await PetOwner.aggregate([
        {
          $lookup: {
            from: "cats",
            localField: "ID_Pet_Owner",
            foreignField: "ID_Pet_Owner",
            as: "cats"
          }
        },
        {
          $unwind: "$cats"
        },
        {
          $lookup: {
            from: "treatments",
            localField: "cats.ID_Cat",
            foreignField: "ID_Cat",
            as: "cats.treatments"
          }
        },
        {
          $lookup: {
            from: "payments",
            localField: "cats.ID_Cat",
            foreignField: "ID_Cat",
            as: "cats.payments"
          }
        },
        {
          $group: {
            _id: "$_id",
            ID_Pet_Owner: { $first: "$ID_Pet_Owner" },
            NamePet_Owner: { $first: "$NamePet_Owner" },
            LastNamePet_Owner: { $first: "$LastNamePet_Owner" },
            PhoneNumber: { $first: "$PhoneNumber" },
            cats: { $push: "$cats" }
          }
        }
    ]);
    owners.reverse();
    res.render('appClinic', {owners});
});

router.get('/PostOwnerCat', async (req, res) => {
    res.render('formOwner');
});

module.exports = router;