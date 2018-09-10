var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var app = express();

// indicates the static resources form app
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MONGOSE CONNECTION TO DB
var mongoDB = 'mongodb://127.0.0.1:27017/nodejschallenge';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// get homepage
app.get('/index.htm', function (req, res) {
   res.sendFile( "/index.htm" );
})

// Creates new User to the API
app.post('/',function(req,res){
    var user = req.body.user;
    try{
        if( validateRequest(req) ){
            // TODO Create User
        }
    }catch(e){
        res.end( JSON.stringify(responses.serverError()));
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
    if(req == undefined) return false;

    // TODO: Create and Validate Token
    if( !IsValidToken("req_token_goes_here") || false){
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