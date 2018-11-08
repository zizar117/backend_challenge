var userRepository = require('../repository/UserRepository')
var serialize = require('../serializers/UserSerializer')

// UserService applies User Object validations
var UserService = function () {
    var self = this;
    self.User = undefined;

    // Validates User Attributes
    self.CreateUser = async function () {

        if (!self.Validate()) {
            throw "Invalid User Object";
        }

        var userCreated = await userRepository.CreateUserRepository(self.User).CreateUser();

        return serialize.Serialize(userCreated, "user");
    }

    // Validaes Buisiness Object
    self.Validate = function () {
        console.info("Validating UserService", self.User)

        if (self.User == undefined) return false;
        if (self.User.id) return false;
        if (self.User.email == undefined || self.User.email == "") return false;
        if (self.User.password == "") return false;

        return true;
    }
}

exports.CreateUserService = function (user = undefined) {

    console.info("CreateUserService ", user);
    if (user === undefined) throw "Invalid User";

    var mUserService = new UserService();
    mUserService.User = user;
    return mUserService;
}
