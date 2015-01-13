# Tâmia CSS regression tests
# Requires CasperJS 1.1

TESTS = 10

phantomcss = require 'phantomcss'

casper.on 'remote.message', (message) ->
	console.log 'BROWSER:', message

casper.on 'page.error', (message, trace) ->
	console.log 'ERROR:', message
	trace.forEach (item) ->
		console.log '  ', item.file + ':' + item.line

phantomcss.init({
	libraryRoot: 'node_modules/phantomcss'
	screenshotRoot: 'tests/screenshots'
	failedComparisonsRoot: 'tests/failures'
	cleanupComparisonImages: true
	fileNameGetter: (root, filename) ->
		name = root + '/' + filename
		if fs.isFile(name + '.png')
			return name + '.diff.png'
		else
		    return name + '.png'
})

snap = (id, suffix) ->
	phantomcss.screenshot "##{id}", id + (if suffix then "_#{suffix}" else "")

casper.test.begin 'Tâmia CSS/styles', TESTS, suite = (test) ->

	casper.start 'specs/styles.html'
	casper.viewport 1024, 1024
	# phantomcss.turnOffAnimations()

	casper.thenEvaluate ->
		#console.log(document.documentElement.className)
		# for rule in document.styleSheets[0].cssRules
			# console.log(rule.cssText)

	casper.thenEvaluate ->
		document.documentElement.className += ' phantomjs'

	# Layout
	casper.then ->
		# PhantomJS supports only legacy flexbox, so wrapping won’t work
		snap 'columns1'
	casper.then ->
		snap 'grid1'
	casper.then ->
		snap 'center1'

	# Code
	casper.then ->
		snap 'code1'

	# List
	casper.then ->
		snap 'list1'

	# Media
	casper.then ->
		snap 'media1'

	# Text & rich typo
	casper.then ->
		snap 'richtypo1'

	# Table
	casper.then ->
		snap 'table1'

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
