# Tâmia CSS regression tests
# Requires CasperJS 1.1

TESTS = 2
PAGE = 'specs/specs.html'

phantomcss = require 'phantomcss'

casper.on 'remote.message', (message) ->
	console.log 'BROWSER:', message

phantomcss.init({
	libraryRoot: 'node_modules/phantomcss'
	screenshotRoot: 'tests/screenshots'
	failedComparisonsRoot: 'tests/failures'
	# addLabelToFailedImage: false
})

snap = (id, suffix) ->
	phantomcss.screenshot "##{id}", id + (if suffix then "_#{suffix}" else "")

casper.test.begin 'Tâmia CSS', TESTS, suite = (test) ->

	casper.start PAGE

	phantomcss.turnOffAnimations()

	###########
	# Modules #
	###########

	# Switcher
	casper.then ->
		snap 'switcher1'
	# Switcher: :checked should have active style
	casper.thenEvaluate ->
		$('#type_second')[0].checked = true
	casper.then ->
		snap 'switcher1', 'after_click'


	casper.then ->
		phantomcss.compareAll()

	casper.run ->
		test.done()
