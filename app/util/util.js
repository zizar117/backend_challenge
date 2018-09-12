var fs = require("fs")

// MONGOSE CONNECTION TO DB
var DBName = "nodejschallenge";
var URLmongoDB = 'mongodb://127.0.0.1:27017/'+ DBName;
var regexMongoID = new RegExp("^[0-9a-fA-F]{24}$");
var regexEmail = /(\w+)\@(\w+)\.[a-zA-Z]/g;

exports.GetDBurl = function(){
    return URLmongoDB;
};

exports.ValidateMongoID = function(idStr){
    if(typeof(idStr)!= "string") return false;
    return regexMongoID.test(idStr);
};

exports.ValidateEmail = function(email){
    if(typeof email != "string") return false;
    return regexEmail.test(email);
};

// Search for an element in the given array
// if finds it then returns the elem
// elem ::: string, number or object
// array::: array of strings, numbers or objects
// prop ::: property of the object to look for in the array of objects
exports.FindInArray = function(elem,array,prop=undefined){
    
    if(prop== undefined){
        for(var i=0; i<array.length;i++){
            if(array[i]==elem)return elem;
        }
    }else{
        for(var i=0; i<array.length;i++){
            if( array[i][prop] == elem[prop]) return array[i];
        }
    }
    return false;
}


// DB  TEST
exports.GetDatFromDB = function(err,data){
    if(err)
        return FailureDBCallback(err);
    else 
        return SuccessDBCallback(data)
}

exports.FailureDBCallback = function(err){
    console.info(err);
}

exports.SuccessDBCallback = function(data){
    return data;
}