const express = require('express');

const app = express();

const PORT = 5000;

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('ooo');
})

app.listen(PORT, () => {
    console.log(`App Running to http://localhost:${PORT}`);
})