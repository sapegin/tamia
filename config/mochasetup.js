global.DEBUG = false;

global.expect = require('chai').expect;

global.window = require('domino').createWindow();
global.document = window.document;
