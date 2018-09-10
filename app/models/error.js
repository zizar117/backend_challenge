"use strict"

class Error{

    constructor(code,description, errors=[]){
        this.code = code;
        this.description=description;
        this.errors = errors;
    }
}

Error.prototype.AddError = function(error = undefined){
    if(error == undefined) return undefined;
    this.errors.push(error);
}

exports.NewError = function(code,description){
    return new Error(code,description);
}
