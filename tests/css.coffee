# Tâmia CSS regression tests
# Requires CasperJS 1.1

TESTS = 8

phantomcss = require 'phantomcss'

casper.on 'remote.message', (message) ->
	console.log 'BROWSER:', message

phantomcss.init({
	libraryRoot: 'node_modules/phantomcss'
	screenshotRoot: 'tests/screenshots'
	failedComparisonsRoot: 'tests/failures'
	cleanupComparisonImages: true
})

snap = (id, suffix) ->
	phantomcss.screenshot "##{id}", id + (if suffix then "_#{suffix}" else "")

casper.test.begin 'Tâmia CSS/specs', TESTS, suite = (test) ->

	casper.start 'specs/specs.html'
	casper.viewport 1024, 768
	phantomcss.turnOffAnimations()

	# Switcher
	casper.then ->
		snap 'switcher1'
	# Switcher: checked item should have active style
	casper.thenEvaluate ->
		$('#type_second')[0].checked = true
	casper.then ->
		snap 'switcher1', 'after_click'

	# Password
	casper.then ->
		snap 'password1'
	# Password: locked with text
	casper.thenEvaluate ->
		$('#password1 .js-field').val('test')
	casper.then ->
		snap 'password1', 'locked'
	# Password: unlocked with text
	casper.thenEvaluate ->
		$('#password1 .password__toggle').mousedown()
	casper.then ->
		snap 'password1', 'unlocked'

	# Select
	casper.then ->
		snap 'select1'
	# Select: change value
	casper.thenEvaluate ->
		$('#select1 .js-select').val('dog').change()
	casper.then ->
		snap 'select1', 'changed'

	# TODO: Spinner

	# Modal
	casper.thenEvaluate ->
		$('#modal1').removeState('hidden')
	casper.then ->
		snap 'modal1'


	casper.then ->
		phantomcss.compareAll()

	casper.run ->
		test.done()
