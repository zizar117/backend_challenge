var userRepository = require('../repository/UserRepository')
var serialize = require('../serializers/UserSerializer')

// UserService applies User Object validations
var UserService = function(){
    var self = this;
    self.User = undefined;

    // Validates User Attributes
    self.CreateUser = function(callback){
        console.info("Creating user in Service");
        if( !self.Validate() ){
            throw "Invalid User Object";
        }
        console.info("Success validation in service");
        userRepository.CreateUserRepository(self.User)
                    .CreateUser((err,uCreated)=>{
                        if(err || !uCreated) throw "Error Creating User";

                        return callback(serialize.Serialize(uCreated,"user"));
                    });
    }

    // Validaes Buisiness Object
    self.Validate = function(){
        console.info("Validating UserService", self.User)

        if(self.User == undefined) return false;
        if(self.User.id ) return false;
        if(self.User.email == undefined || self.User.email == "") return false;
        if( self.User.password == "" ) return false;

        return true;
    }
}

exports.CreateUserService = function(user=undefined){

    console.info("CreateUserService ",user);
    if(user === undefined) throw "Invalid User";

    var mUserService = new UserService();
    mUserService.User = user;
    return mUserService;
}
