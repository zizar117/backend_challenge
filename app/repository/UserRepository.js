var userSchema = require('../schemas/UserSchema');
var mongoose = require("mongoose");

var util = require('../util/util');

var UserRepository = function(){

    var self = this;
    self.User = undefined;
    self.CreateUser = function(){
        
        console.info("Creating user in Repository");
        if( !self.Validate() ){
            throw "Error Validating User Business Model";
        }
        console.info("Success validation in Repository");

        self.User.status = 'init';
        var us = userSchema.CreateUserSchema(self.User)

        console.info("Success schema creation");

        mongoose.connect(util.GetDBurl(),function(err){
            if(err){
                console.info("error connecting DB",err);
                throw err;
            }
            console.info("Success MongoDB connection");

            us.save(function(err){
                if(err){
                    console.info("error saving",err);
                    throw err;
                }
                console.log("Success")
            });
        });
        
        return self.User;
    },

    self.FindUserByID = function(id){

        if( !util.ValidateMongoID(id) ){
            throw "Error Validating Id";
        }
        var us = userSchema.CreateUserSchema(self.User)

        mongoose.connect(util.GetDBurl(),function(err){
            if(err)throw err;

            us.findById(id, function(err,user){
                if(err) throw err;
                self.User = user;
                return self.User;
            });
        });
    },

    // Validates User Business Logic
    self.Validate = function(){
        // TODO: Here goes User business model validation
        return true;
    }

}

exports.CreateUserRepository = function(user = undefined){
    if(user == undefined) return undefined;

    console.info("Creating userRepository");

    var uRepository = new UserRepository();
    uRepository.User = user;
    return uRepository;
}

function ExecuteAction(func,action){
    // MONGOSE CONNECTION TO DB
    mongoose.connect(util.GetDBurl(),function(err){
        if(err)throw err;
    });

}