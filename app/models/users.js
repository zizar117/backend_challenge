var fs = require("fs");

var User = function(){
    this.id = 0,
    this.name = "",
    this.coords = [0.0,0.0],
    this.status = "init",
    this.allowedParams = ["id","name","coords","status"],

    this.validate = function(){

        if(this.id == undefined || this.id != 0) return false;
        if(this.name == undefined || this.name == "") return false;
        if( !Array.isArray(this.coords)   || this.coords.length  !== 2 ) return false;

        return true;
    },

    this.buildUserByObject = function(user=undefined){
        if(user == undefined || typeof(user) != "object") return undefined;

        this.allowedParams.forEach(function(key){
            this[key] = user[key];
        });
        return this;
    }
}

exports.newInstance = function(){
    return new User();
}

User.prototype.getUsers= function(){
    var data = fs.readFileSync( "./app/json/users/users.json", 'utf8')
    return JSON.parse( data );
}

exports.getUser = function(id){
    var user = new User();

    var users = user.getUsers();
    var uid = "user_"+id
    return users[uid];
}
