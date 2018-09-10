var userRepository = require('../repository/UserRepository')

// UserService applies User Object validations
var UserService = function(){
    var self = this;
    self.User = undefined;

    // Validates User Attributes
    self.CreateUser = function(){
        if( !self.Validate() ){
            throw "Invalid User Object";
        }
        return userRepository.CreateUserRepository().CreateUser(user);
    }

    // Validaes Buisiness Object
    self.Validate = function(){
    
        if(self.User == undefined) return false;
        if(self.User.id == undefined || self.User.id != 0) return false;
        if(self.User.email == undefined || self.User.email == "") return false;
        if( self.User.password == "" ) return false;

        return true;
    }
}

exports.CreateUserService = function(user=undefined){
    if(user === undefined) throw "Invalid User";

    var mUserService = new UserService();
    mUserService.User = mUser;
    return mUserService;
}
