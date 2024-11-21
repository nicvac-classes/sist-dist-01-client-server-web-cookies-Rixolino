const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');

// Configurazione EJS
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    const name = req.cookies.name;
    if (name) {
        res.render('greet', {message:'Bentornato',name:name});
    } else {
        res.render('form');   
    }
});

app.post('/greet', (req, res) => {
    const name = req.body.name;
    res.cookie('name',name, {maxAge: 24*60*60*1000});
    res.render('greet', { message: 'Benvenuto',name: name });
});

app.post('/logout', (req,res) => {
    const name = req.body.name;
    res.clearCookie('name');
    res.redirect('/')
    Object.keys(req.cookies).forEach(cookie => res.clearCookie(cookie));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});