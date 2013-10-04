casper = require('casper').create
	verbose: true
	# logLevel: 'debug'

casper.count = (s) ->
	@evaluate ((s) ->
		(document.querySelectorAll s).length
	), s


casper.start 'specs/specs.html'

# Ensure page was created
casper.then ->
	@test.assertTitle 'Tâmia', 'Specs file loaded'


###########
# JS core #
###########

# All components initialized
casper.then ->
	@test.assert (@count '[data-component]') > 0, 'There are some components'
	@test.assert (@count '[_tamia-yep="yes"]') == (@count '[data-component]') - 1, 'All visible components initialized'  # Except one invisible


# Invisible components initialization
casper.then ->
	@test.assertNotVisible '.js-invisible', 'Invisible element is invisible'
casper.thenEvaluate ->
	(jQuery '.js-invisible').show()
casper.then ->
	@test.assertVisible '.js-invisible', 'Invisible element is now visible'
casper.thenEvaluate ->
	(jQuery '.js-invisible').trigger 'init.tamia'
casper.then ->
	@test.assertEquals (@count '[data-component]'), (@count '[_tamia-yep="yes"]'), 'All invisible components initialized'


# Dynamic initialization
casper.thenEvaluate ->
	container = (jQuery '.js-container')
	container.html container.html().replace /_tamia-yep="yes"/g, '',
casper.then ->
	@test.assertExists '.js-container [data-component]', 'There are some new components'
	@test.assertNotExists '.js-container [_tamia-yep]', 'All new components not initialized'
casper.thenEvaluate ->
	(jQuery '.js-container').trigger 'init.tamia'
casper.then ->
	@test.assertEquals (@count '[data-component]'), (@count '[_tamia-yep="yes"]'), 'All new components initialized'

# Appear/disappear
casper.thenEvaluate ->
	@test.assertNotVisible '.js-dialog', 'Dialog is hidden by default'

casper.thenClick '.js-appear', ->
	@test.assertVisible '.js-dialog', 'Dialog is visible after click on Appear link'
	@test.assertExists '.js-dialog.is-transit', 'Dialog has .is-transit class just after click'

casper.wait 750, ->
	@test.assertVisible '.js-dialog', 'Dialog is still visible after transition ends'
	@test.assertEval (->
		!(jQuery '.js-dialog').hasClass('is-transit')
	), '.is-transit class has been removed after transition but before fallback timeout'

casper.thenClick '.js-disappear', ->
	@test.assertVisible '.js-dialog', 'Dialog is visible just after click on Disappear link'
	@test.assertExists '.js-dialog.is-transit', 'Dialog has .is-transit class just after click'

casper.wait 750, ->
	@test.assertNotVisible '.js-dialog', 'Dialog is not visible after transition ends'
	@test.assertEval (->
		!(jQuery '.js-dialog').hasClass('is-transit')
	), '.is-transit class has been removed after transition but before fallback timeout'


##########
# Blocks #
##########

# Password
casper.then ->
	@test.assertEval (->
		(jQuery '.js-password').hasClass('is-ok')
	), 'Password: initialized'
	@test.assertEvalEquals (->
		(jQuery '.js-password .password__field').attr('type')
	), 'password', 'Password: default input type is "password"'
casper.thenEvaluate ->
	(jQuery '.js-password .password__field').focus()
	(jQuery '.js-password .password__toggle').mousedown()
casper.then ->
	@test.assertEval (->
		(jQuery '.js-password').hasClass('is-unlocked')
	), 'Password: container has class "is-unlocked"'
	@test.assertEvalEquals (->
		(jQuery '.js-password .password__field').attr('type')
	), 'text', 'Password: input type is "text" after toggle'
	@test.assertEval (->
		document.activeElement == (jQuery '.js-password .password__field')[0]
	), 'Password: input has focus'


casper.run ->
	@test.renderResults true
