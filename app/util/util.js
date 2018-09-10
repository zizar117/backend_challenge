var fs = require("fs")

// MONGOSE CONNECTION TO DB
var DBName = "nodejschallenge";
var URLmongoDB = 'mongodb://127.0.0.1:27017/'+ DBName;
var regexMongoID = new RegExp("^[0-9a-fA-F]{24}$");

exports.GetDBurl = function(){
    return URLmongoDB;
};

exports.ValidateMongoID = function(idStr){
    if(typeof(idStr)!= "string") return false;
    return regexMongoID.test(idStr);
};

exports.createJSON = function(fileName, data){
    fs.writeFile( "./app/json/" + fileName, data , 'utf8', function (err) {
        if (err) {
            return err.message;
        }
        console.log('The file has been saved!');
        return null;
    });
}

exports.deleteJSONFiles = function(dirPath){
    
        try { var files = fs.readdirSync(dirPath); }
        catch(e) { return "Error reading path: "+dirPath; }
        if (files.length > 0)
          for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
              fs.unlinkSync(filePath);
            else
            deleteJSONFiles(filePath);
          }
          return null;
}

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