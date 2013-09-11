# JS core without jQuery

casper = require('casper').create
	verbose: true
	# logLevel: 'debug'

casper.count = (s) ->
	@evaluate ((s) ->
		(document.querySelectorAll s).length
	), s


casper.start 'tests/src/no-jquery.html'


casper.then ->
	@test.assertTitle 'Tâmia: no jQuery', 'Test file loaded'
	@test.assert (@count '[data-component]') > 0, 'There are some components'
	@test.assertEqual (@count '[_tamia-yep="yes"]'), (@count '[data-component]'), 'All components initialized'
	@test.assertExists '.where-is-my-pony', 'Test component initialized'


casper.run ->
	@test.renderResults true
