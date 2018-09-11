var crypt = require("../util/crypt");
var authService = require('../services/AuthService');
var myText = "CreatedByCesar";
var defaultAuthType = "ZTOKEN";

var tokenType = {
    action: String,
    params: {}
}

exports.GetDefaultAuthType = function(){
    return defaultAuthType;
}

// authType default is "ZTOKEN"
exports.GenerateToken = function(authType=undefined,claims=undefined){

    if(!authType || !claims){
        console.info("Error generating token")
        throw "Error generating token";
    }

    var tokenArr = [];

    tokenArr.push( crypt.Encode64(authType) );
    tokenArr.push( crypt.Encode64(getParamsString(claims)) );
    tokenArr.push( crypt.Encode64(crypt.CipherText(myText) ) );

    return tokenArr.join(".");
}

// Receives athe token xxxxxx.yyyyyy.zzzzzz
exports.ValidateToken= function(token = ""){
    if(token == "")return false;

    var tokenArr = token.split(".");
    var claims;

    // Validate 1rst token part
    if( crypt.Decode64(tokenArr[0]) !== defaultAuthType ) return false;

    // Validate 2nd token part
    claims = crypt.Decode64(tokenArr[1])
    if(claims.length ==0 ) return false;

    // Validate 3rd token part
    var text = crypt.Decode64(tokenArr[2]);
    text = crypt.DecryptText(text);
    if(text !== myText) return false;

    return getClaimsFromString(claims);
}

exports.Login= function(email, pwd){
    authService.Login(email,pwd);
}

function getParamsString(params={}){
    let strResult = [];
    Object.keys(params).forEach(function(key){
        strResult.push(key+'='+params[key]);
    });
    return strResult.join(";");
}

function getClaimsFromString(str){
    var claims ={};
    str.split(";").forEach(function(keyValue){
        var values = keyValue.split("=");
        claims[values[0]] = values[1];
    })
    return claims;
}