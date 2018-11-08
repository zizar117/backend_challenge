var User = require('../schemas/UserSchema');
var mongoose = require("mongoose");

var util = require('../util/util');
var crypt = require('../util/crypt');

// Class to handle Connection to DB and transactions
// In charge of mapping Query result to Business User Object
var UserRepository = function () {

    var self = this;
    self.User = undefined;
    self.CreateUser = async function () {

        if (!self.Validate()) {
            throw "Error Validating User Business Model";
        }

        self.User.status = 'init';
        self.User.hashed_password = self.User.password;

        var userCreated;
        await mongoose.connect(util.GetDBurl(), async function (err) {
            if (err) {
                throw err;
            }

            let user = new User(self.User);

            await user.save(function (err) {
                if (err) {
                    console.info("Error User Create: ", err)
                    throw err;
                }
            });
            userCreated = user;
        });

        return userCreated;
    };

    // FindUserByID finds user by the given ID
    self.FindUserByID = async function (id) {

        if (false && !util.ValidateMongoID(id)) {
            throw "Incorrect format ID";
        }
        console.info("idUser ", id);

        var userFound;
        await mongoose.connect(util.GetDBurl(), async function (err) {
            if (err) throw err;

            var userF;
            await User.findById(id, function (err, user) {
                if (err) {
                    console.info("Error User FindByID: ", err)
                    throw err;
                }

                userF = user;
            });
            userFound = userF;
        });
        return userFound;
    };

    // FindUserByEmail finds user by the given email
    self.FindUserByEmail = async function (email) {
        if (!util.ValidateEmail(email)) {
            throw "Error validating user email";
        }

        var userFound;
        await mongoose.connect(util.GetDBurl(), async function (err) {
            if (err) throw err;

            var userF;
            await User.find({ email: email }, function (err, user) {
                if (err) {
                    console.info("Error FindUserByEmail", err)
                    throw err;
                }
                userF = user[0];
            });
            userFound = userF;
        });
        return userFound;
    };

    // Validates User Business Logic
    self.Validate = function () {
        // TODO: Here goes User business model validation
        self.User.password = crypt.HashStringSync(self.User.password);
        console.info("User validated ", self.User)
        return true;
    }

}

// CreateUserRepository returns instance of User Repository object
exports.CreateUserRepository = function (user = undefined) {
    if (user == undefined) return undefined;

    console.info("Creating userRepository");

    var uRepository = new UserRepository();
    uRepository.User = user;
    return uRepository;
}
