"use strict"

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email:           { type: String, required: true },
    hashed_password: { type: String, required: true },
    status:          { type: String, required: true },
    created_at:      { type: Date, default: Date.now },
    updated_at:      { type: Date },
    deleted:         { type:Boolean, default: false }
});

userSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    else
        // change the updated_at field to current date
        this.updated_at = currentDate;

    this.status = 'init';

    next();
});

var User = mongoose.model('User', userSchema);

exports.CreateUserSchema = function(user = undefined){
    if(user == undefined) return undefined;

    var userSchema = new User({
        email: user.email,
        hashed_password: user.password,
        status: user.status
    })
    return userSchema;
}

// make this available to our users in our Node applications
//module.exports = User;