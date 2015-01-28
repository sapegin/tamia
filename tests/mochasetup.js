// Mocha environment setup

// Make modules in `src` folder requirable
process.env.NODE_PATH = __dirname + '/../src:' + (process.env.NODE_PATH || '');
require('module').Module._initPaths();

// Make Chai’s expect available for all tests
global.expect = require('chai').expect;
