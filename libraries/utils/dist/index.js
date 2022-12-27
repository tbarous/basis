'use strict';

var path = require('path');

var root = path.resolve(__dirname, '../');
var fromRoot = function (location) { return path.resolve(root, location); };

exports.fromRoot = fromRoot;
