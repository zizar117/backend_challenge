var express = require('express');
var bodyParser = require("body-parser");

var userService = require('./app/services/UserService');
var authService = require('./app/services/AuthService');
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
    try{
        if( true || validateRequest(req) ){
            console.info("Success validation in server");
            var uService = userService.CreateUserService(user)
            uService.CreateUser((data)=>{
                console.info("Success user creation");
                res.end( JSON.stringify(responses.successResponse(data, 200, "success" )) );
            })
        }else{
            res.end( JSON.stringify(responses.badRequest("Invalid Request",400,"Invalid request")));
        }
    }catch(e){
        res.end( JSON.stringify(responses.badRequest(e,400,"Invalid request")));
    }
});

// Authenticates User
app.post('/auth',function(req,res){
    var user = req.body.user;
    console.info("Login user",user);
    try{
        
        console.info("Success validation in server");
        authService.Login(user.email, user.password,(data)=>{
            console.info("Success user Login",data);
            res.end( JSON.stringify(responses.successResponse(data, 200, "success" )) );
        });
        
    }catch(e){
        res.end( JSON.stringify(responses.badRequest(e,400,"Invalid request")));
    }
});

// Handle /hello route to prove authentication
app.get("/hello",function(req,res){

    try{
        var token = req.headers.authorization;
        console.info("token",token);
        if( token == undefined) throw "Invalid request";

        token = token.replace("Bearer ","");
        console.info("token",token);
        authService.Authenticate(token,function(user){
            if(!user){throw "Invalid User";}

            res.end( JSON.stringify(responses.successResponse({"Hello":"World"}, 200, "success" )) );
        });

    }catch(e){
        res.end( JSON.stringify(responses.badRequest(e,400,"Invalid request")));
    }
});

// Hanbdle 404 request
app.get('*', function(req, res){
    res.status(404).send('Return to the light side young master!!!');
});

// Validates the incoming object attributes
function validateRequest(req=undefined){
    if(req == undefined || req.body.user == undefined) return false;

    // TODO: Create and Validate Token
    if( !IsValidToken("req_token_goes_here") && false){
        return false;
    }
    return true;
}

// start listening on por 8081
var server = app.listen(process.env.PORT || '8081', function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Listening at http://%s:%s", host, port)
})