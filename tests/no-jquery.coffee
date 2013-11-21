# JS core without jQuery
# Requires CasperJS 1.1

casper.count = (s) ->
	@evaluate ((s) ->
		(document.querySelectorAll s).length
	), s

casper.test.begin('No jQuery', 4, suite = (test) ->
	# verbose: true
	# logLevel: 'debug'

	casper.start 'tests/src/no-jquery.html'

	casper.then ->
		test.assertTitle 'Tâmia: no jQuery', 'Test file loaded'
		test.assert (@count '[data-component]') > 0, 'There are some components'
		test.assertEqual (@count '[_tamia-yep="yes"]'), (@count '[data-component]'), 'All components initialized'
		test.assertExists '.where-is-my-pony', 'Test component initialized'

	casper.run ->
		test.done()
)
