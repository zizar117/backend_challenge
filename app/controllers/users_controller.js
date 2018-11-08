var express = require('express');
var path = require("path");

var authService = require('../services/AuthService');
var userService = require('../services/UserService');
var responses = require('../models/responses')

var controllerName = "users"
var router = express.Router();


router.get("/index.htm", function (req, res) {
    res.sendFile(path.join(controllerName, "/index.htm"))
})

router.get("/user.htm", function (req, res) {
    res.sendFile(path.join(controllerName, "/user.htm"))
})

// Creates new User to the API
router.post('/', async function (req, res) {
    var user = req.body.user;
    console.info("Creating user", user);
    try {
        var data = await userService.CreateUserService(user).CreateUser();
        res.end(JSON.stringify(responses.successResponse(data, 200, "success")));

    } catch (e) {
        res.end(JSON.stringify(responses.badRequest(e, 400, "Invalid request")));
    }
});

module.exports = router;