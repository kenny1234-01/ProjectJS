const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('Treatment');
});

module.exports = router;