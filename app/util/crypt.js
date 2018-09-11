const bcrypt = require("bcrypt")

// SYNC Encryption
exports.HashStringSync = function(str){
    console.info("Hashing string sync "+str);
    return bcrypt.hashSync(str,10);
}

exports.CompareHashSync = function(str,hash){
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