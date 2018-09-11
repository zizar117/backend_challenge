var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var userService = require('./app/services/UserService');
var responses = require('./app/models/responses')

var app = express();

// indicates the static resources form app
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// get homepage
app.get('/index.htm', function (req, res) {
   res.sendFile( "/index.htm" );
})

// Creates new User to the API
app.post('/',function(req,res){
    var user = req.body.user;
    console.info("Creating user",user);
    console.info(typeof user)
    try{
        if( true || validateRequest(req) ){
            console.info("Success validation in server");
            var uService = userService.CreateUserService(user)
            console.info("Success user creation");
            res.end( JSON.stringify(responses.successResponse("success", 200, uService.CreateUser() )) );
        }else{
            res.end( JSON.stringify(responses.badRequest("Invalid Request",400,"Invalid request")));
        }
    }catch(e){
        res.end( JSON.stringify(responses.badRequest(e,400,"Invalid request")));
    }
});

function IsValidToken(token = undefined, action=undefined){
    if( toekn == undefined) return false;

    // TODO: Integrate JWT validation
    //token.validate()
    return true;
}

// Validates the incoming object attributes
function validateRequest(req=undefined){
    if(req == undefined || req.user == undefined) return false;

    // TODO: Create and Validate Token
    if( !IsValidToken("req_token_goes_here") && false){
        return false;
    }
    return true;
}



// start listening on por 8081
var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Listening at http://%s:%s", host, port)
})