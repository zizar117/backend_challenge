/**
 * enviroment.js
 */
var mongoose = require('mongoose');
var http = require('http');

var util = require('../util/util')

// Create DB if doesnt exists
mongoose.connect(util.GetDBurl()); 

// Closes connection
mongoose.connection.close()

// By default mongoose creates collections when the first element is inserted
