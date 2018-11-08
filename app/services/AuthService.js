var userRepo = require('../repository/UserRepository')
var crypt = require('../util/crypt')
var auth = require("../middleware/auth")

exports.Login = async function (email, password) {
    var user = {
        email: email,
        hashed_password: password
    };

    var userFound = await userRepo.CreateUserRepository(user).FindUserByEmail(user.email);

    if (!userFound) throw "Error finding User By Email";

    if (!crypt.CompareHashSync(password, userFound.hashed_password)) {
        console.log("user or password invalid" + password)
        throw "Invalid email or password";
    }

    return GenerateLoginToken(userFound._id)
}

// Retuns the user found in DB
exports.Authenticate = async function (token) {

    var claims = auth.ValidateToken(token);

    if (!claims) throw "Authenticate error: Invalid token";

    var user = { email: "example@mail.com" };
    var userFound = await userRepo.CreateUserRepository(user).FindUserByID(claims.id);

    return userFound;
};

// Validates the incoming request and saves User is session
exports.GetCurrentUser = async function (req = undefined) {
    if (req == undefined) return false;

    var token = req.headers.authorization;
    console.log(token);

    if (token == undefined || token == "") return false;

    token = token.replace("Bearer ", "");
    try {
        var user = await authService.Authenticate(token);
        console.info("GetCurrentUser: " + user)
        if (user) {
            req.session.User = user;
            return true;
        }
        return false;

    } catch (e) {
        return false;
    }
}

// returns the tokengenerated token based on the given userID
function GenerateLoginToken(idUser) {
    var claims = {
        id: idUser,
        action: "login"
    }
    return auth.GenerateToken(auth.GetDefaultAuthType(), claims);
}