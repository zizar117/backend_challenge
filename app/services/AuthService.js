var userRepo = require('../repository/UserRepository')
var crypt = require('../util/crypt')
var auth = require("../core/auth")

exports.Login = function(email,password,callBack){
    var user = {
        email: email, 
        hashed_password:password 
    };

    console.info("AuthService Login")
    userRepo.CreateUserRepository(user)
            .FindUserByEmail(user.email,function(err,userModel){
                if(err || !userModel) throw "Error finding User By Email";

                console.info("Auth service user found",userModel);
                if(!crypt.CompareHashSync(password,userModel.hashed_password)){
                    throw "Invalid email or password";
                }
                // TODO: Return TOken
                return callBack(GenerateLoginToken(userModel._id));
            });
}

exports.Authenticate = function(token,callBack){
    console.info("Authenticating");
    var claims = auth.ValidateToken(token);

    if(!claims) throw "Authenticate error: Invalid token";

    var user = {email: "example@mail.com"};
    userRepo.CreateUserRepository(user)
            .FindUserByID(claims.id,function(err,userModel){
                if(err) throw "Error user not found";
                return callBack(userModel);
            });
};

function GenerateLoginToken(idUser){
    var claims = {
        id: idUser,
        action: "login"
    }
    return auth.GenerateToken(auth.GetDefaultAuthType(),claims);
}