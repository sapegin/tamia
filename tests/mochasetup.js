// Mocha environment setup

var path = require('path');
var atomus = require('atomus');

var ROOT = path.join(__dirname, '../');


/**
 * Make Chai’s expect available for all tests.
 */
global.expect = require('chai').expect;


/**
 * Creates jsdom browser, loads module via Require.js and register it as a global function.
 * @param {String} module Name of Require.js module: will be available as global.module().
 * @param {Function} done
 */
global.requireTest = function(module, done) {
	var requireJs = path.join(ROOT, 'bower_components/requirejs/require.js');
	var requireConfig = {
		baseUrl: path.join(ROOT, 'src'),
		paths: {
			jquery: path.join(ROOT, 'node_modules/atomus/lib/vendor/jquery-1.11.1.min.js')
		}
	};

	atomus()
		.html(
			'<!doctype html>' +
			'<script src="' + requireJs + '"></script>' +
			'<script>' +
			'function load(done) {' +
				'requirejs.config(' + JSON.stringify(requireConfig) + ');' +
				'requirejs(["' + module + '"], done);' +
			'}' +
			'</script>'
		)
		.ready(function(errors, window) {
			global.browser = this;
			window.load(function(func) {
				global[module] = func;
				done(null, func);
			});
		});
};
