# Tâmia CSS regression tests
# Requires CasperJS 1.1

TESTS = 4

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

casper.test.begin 'Tâmia CSS/styles', TESTS, suite = (test) ->

	casper.start 'specs/styles.html'
	casper.viewport 1024, 768
	phantomcss.turnOffAnimations()

	# Layout
	# casper.then ->
	# 	snap 'columns1'
	casper.then ->
		snap 'grid1'
	casper.then ->
		snap 'center1'

	# Tooltip
	casper.then ->
		snap 'tooltip1'
	# TODO: Tooltip on hover

	# Fade
	casper.then ->
		snap 'fade1'

	# Rouble
	# casper.then ->
	# 	snap 'rouble1'


	casper.then ->
		phantomcss.compareAll()

	casper.run ->
		test.done()
