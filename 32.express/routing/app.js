const express = require('express')
const ExpressError = require('./expressError')
const userRoutes = require('./userRoutes')
const middleware = require('./middleware')
const morgan = require('morgan')

const app = express();

app.use(express.json())
app.use(morgan('dev'))

app.use('/users', userRoutes);
app.get('/favicon.ico', (req, res) => {
    res.sendStatus(204);
});


app.get('/secret',middleware.checkForPassword, (req, res) => {
    return res.send("I Love You <3 For real.");
});


app.get('/private',middleware.checkForPassword, (req, res) => {
    res.send("You have reached the private page. It is private");
});




// 404 handler
app.use((req, res) => {
    return new ExpressError("Not Found", 404);
});

// generic error handler
app.use((error, req, res, next) => {
    let status = error.status || 500;
    return res.status(status).json({
        error: {
            message: error.message,
            status : status
        }
    });
});

app.listen(3000, () => {
    console.log("App started at port: 3000");
})