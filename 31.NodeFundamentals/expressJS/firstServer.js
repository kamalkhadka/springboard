const express = require('express')

app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('HOMEPAGE');
})

app.get('/dogs', (req, res)=>{
    console.log('You asked for /dogs');
    res.send("Woof Woof");
})

app.post('/chickens', function createChicken(req, res)  {
    res.send("YOU CREATED A NEW CHICKEN");
})

app.get('/chickens', (req, res) =>{
    res.send('bock bock bock')
})

const greetings = {
    en: "hello",
    fr: "bonjour",
    ic: "hallo",
    js: "konnichiwa"
}

app.get('/greet/:language', (req, res)=>{
    const lang = req.params.language;
    const greeting = greetings[lang];
    res.send(greeting);
})

app.get('/show-me-headers', (req, res) => {
    console.log(req.rawHeaders);
    console.log(req.headers);
    res.send(req.headers);
})

app.get('/show-language', (req, res) => {
    const lang = req.headers['accept-language'];
    res.send(`Your language preference is ${lang}`)
})

app.post('/register', (req, res) => {
    res.send(req.body);
})

app.get('/search', (req, res) =>{
    const {term, sort } = req.query;
    return res.send(`SEARCH PAGE Term is: ${term} Sort is: ${sort}`);
})

app.listen(3000, function(){
    console.log('App on port 3000');
});