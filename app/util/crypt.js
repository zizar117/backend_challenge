const bcrypt = require("bcrypt")
var crypto = require('crypto');
var secretKey = "C0d1ngCh4ll3ng3";

// SYNC Encryption
exports.HashStringSync = function(str){
    console.info("Hashing string sync "+str);
    return bcrypt.hashSync(str,10);
}

exports.CompareHashSync = function(str,hash){
    console.info(str);
    console.info(hash);
    return bcrypt.compareSync(str,hash);
};


// ASYNC Encryption
exports.HashString = function(str){
    console.info("Hashing string "+str);
    bcrypt.hash(str,10,function(err,hash){
        if(err){
            console.info("Error Hashing string "+str,err);
            throw err;
        }
        console.info("BcryptedStr ",hash);
        return callback(hash);
    })
}

exports.CompareHash = function(str,hash){
    bcrypt.compare(str,hash,function(err,res){
        if(err){
            return false;
        }
        return true;
    });
}


// ENCODE & DECODE
exports.Encode64 = function(str){
    var buff = new Buffer(str);  
    return buff.toString('base64');
}

exports.Decode64 = function(str){
    var buff = new Buffer(str, 'base64');  
    return buff.toString('ascii');
}

// CIPHER & DECHIPER
exports.CipherText = function(str="", algorithm="aes-256-ctr"){
    var cipher = crypto.createCipher(algorithm,secretKey)
    var crypted = cipher.update(str,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

exports.DecryptText = function(str="",algorithm="aes-256-ctr"){
    var decipher = crypto.createDecipher(algorithm,secretKey)
    var dec = decipher.update(str,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }