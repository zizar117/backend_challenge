var User = require('../schemas/UserSchema');
var mongoose = require("mongoose");

var util = require('../util/util');
var crypt = require('../util/crypt');

// Class to handle Connection to DB and transactions
// In charge of mapping Query result to Business User Object
var UserRepository = function(){

    var self = this;
    self.User = undefined;
    self.CreateUser = function(dbCallback){
        
        console.info("Creating user in Repository");
        if( !self.Validate() ){
            throw "Error Validating User Business Model";
        }
        console.info("Success validation in Repository");

        self.User.status = 'init';
        self.User.hashed_password = self.User.password;

        mongoose.connect(util.GetDBurl(),function(err){
            if(err){
                console.info("error connecting DB",err);
                throw err;
            }
            console.info("Success MongoDB connection");

            let user = new User(self.User);

            user.save(function(err){
                if(err){
                    console.info("error saving",err);
                }
                console.info("Success",user)
                return dbCallback(err,user);
            });
        });
    },

    // FindUserByID finds user by the given ID
    self.FindUserByID = function(id,dbCallback){

        if( false && !util.ValidateMongoID(id) ){
            throw "Incorrect format ID";
        }
        console.info("idUser ",id);

        mongoose.connect(util.GetDBurl(),function(err){
            if(err)throw err;

            User.findById(id, function(err,user){
                if(err) throw err;
                console.info("User obtained: ",user);
                return dbCallback( err,user );
            });
        });
    },

    // FindUserByEmail finds user by the given email
    self.FindUserByEmail = function(email, dbCallback){
        if( !util.ValidateEmail(email) ){
            throw "Error validating user email";
        }

        mongoose.connect(util.GetDBurl(),function(err){
            if(err)throw err;

            User.find({ email: email }, function(err,user){
                if(err){
                    console.info("Error FindUserByEmail",err)
                    throw err;
                }
                console.info("UserRepo user found",user);
                return dbCallback( err, user[0] );
            });
        });
    },

    // Validates User Business Logic
    self.Validate = function(){
        // TODO: Here goes User business model validation
        self.User.password = crypt.HashStringSync(self.User.password);
        console.info("User validated ",self.User)
        return true;
    }

}

// CreateUserRepository returns instance of User Repository object
exports.CreateUserRepository = function(user = undefined){
    if(user == undefined) return undefined;

    console.info("Creating userRepository");

    var uRepository = new UserRepository();
    uRepository.User = user;
    return uRepository;
}
