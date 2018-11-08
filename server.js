var express = require('express');
var bodyParser = require("body-parser");
var uuid = require('uuid/v4')

var authService = require('./app/services/AuthService');
var responses = require('./app/models/responses')

var app = express();
var path = require('path');
var session = require('express-session')

var usersRouter = require('./app/controllers/users_controller');

// indicates the static resources form app
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public/views')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    genid: (req) => {
        console.log(req.sessionID)
        return uuid() // use UUIDs for session IDs
    },
    user: null,
    secret: 'zizar test',
    resave: false,
    saveUninitialized: true
}))

app.use('/users', usersRouter);

// get homepage
app.get('/index.htm', function (req, res) {
    res.sendFile("/index.htm");
})

// Login User
app.post('/auth', async function (req, res) {
    var user = req.body.user;
    try {
        var data = await authService.Login(user.email, user.password)

        if (data) {
            res.end(JSON.stringify(responses.successResponse(data, 200, "success")));
        } else {
            res.end(JSON.stringify(responses.badRequest("Invalid User", 400, "Bad request")));
        }

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

// Handle /hello route to prove authentication
app.get("/hello", async function (req, res) {
    console.log("/hello")
    try {
        if (await authService.GetCurrentUser(req)) {
            res.end(JSON.stringify(responses.successResponse({ "Hello": "World" }, 200, "success")));
        } else {
            res.end(JSON.stringify(responses.badRequest("Invalid User", 403, "Forbidden")));
        }

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

// Hanbdle 404 request
app.get('*', function (req, res) {
    res.status(404).send('Return to the light side young master!!!');
});

// start listening on por 8081
var server = app.listen(process.env.PORT || '8081', function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Listening at http://%s:%s", host, port)
})