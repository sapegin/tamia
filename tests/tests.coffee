# Tâmia tests
# Requires CasperJS 1.1
#
# Debug:
# casperjs test --verbose --log-level=debug tests/tests.coffee

TESTS = 92

casper.on 'remote.message', (message) ->
	console.log 'BROWSER:', message

casper.count = (s) ->
	@evaluate ((s) ->
		(document.querySelectorAll s).length
	), s

casper.test.begin('Tâmia', TESTS, suite = (test) ->

	casper.start 'specs/specs.html'

	# Ensure page was created
	casper.then ->
		test.assertTitle 'Tâmia', 'Specs file loaded'


	###########
	# JS core #
	###########

	# All components initialized
	casper.then ->
		all = @count '[data-component]'
		test.assert all > 0, 'There are some components'
		test.assertEquals (all-1), (@count '[_tamia-yep="yes"]'), 'All visible components initialized'


	# Hidden components (Component.isInitializable())
	casper.then ->
		test.assertNotVisible '.js-hidden-component', 'Hidden component is hidden by default'
	casper.thenEvaluate ->
		(jQuery '.js-hidden').show().trigger('init.tamia')
	casper.then ->
		test.assertVisible '.js-hidden-component', 'Hidden component is visible now'
		test.assertEval (->
				(jQuery '.js-hidden-component').hasClass('is-ok')
			), 'Hidden component hidden: has class .is-ok'
		test.assertEval (->
				(jQuery '.js-hidden-component').hasClass('is-pony')
			), 'Hidden component hidden: has class .is-pony'


	# Dynamic initialization
	casper.thenEvaluate ->
		container = (jQuery '.js-container')
		container.html container.html().replace /_tamia-yep="yes"/g, '',
	casper.then ->
		test.assertExists '.js-container [data-component]', 'There are some new components'
		test.assertNotExists '.js-container [_tamia-yep]', 'All new components not initialized'
	casper.thenEvaluate ->
		(jQuery '.js-container').trigger 'init.tamia'
	casper.then ->
		test.assertEquals (@count '[data-component]'), (@count '[_tamia-yep="yes"]'), 'All new components initialized'


	# Unsupported components (Component.isSupported())
	casper.then ->
		test.assertEval (->
				(jQuery '.js-unsupported-component').hasClass('is-unsupported')
			), 'Unsupported component has class .is-unsupported'
		test.assertEval (->
				(jQuery '.js-unsupported-component').hasClass('is-no-pony')
			), 'Unsupported component has class .is-no-pony'
		test.assertEval (->
				!(jQuery '.js-unsupported-component').hasClass('is-ok')
			), 'Unsupported component has no class .is-ok'
		test.assertEval (->
				!(jQuery '.js-unsupported-component').hasClass('is-pony')
			), 'Unsupported component has no class .is-pony'


	# TODO: jQuery shortcuts


	# Appear/disappear
	casper.then ->
		test.assertNotVisible '.js-dialog', 'Dialog is hidden by default'
	casper.thenClick '.js-appear', ->
		test.assertVisible '.js-dialog', 'Dialog is visible after click on Appear link'
		test.assertExists '.js-dialog.is-transit', 'Dialog has .is-transit class just after click'
	casper.wait 750, ->
		test.assertVisible '.js-dialog', 'Dialog is still visible after transition ends'
		test.assertEval (->
			!(jQuery '.js-dialog').hasClass('is-transit')
		), '.is-transit class has been removed after transition but before fallback timeout'
	casper.thenClick '.js-disappear', ->
		test.assertVisible '.js-dialog', 'Dialog is visible just after click on Disappear link'
		test.assertExists '.js-dialog.is-transit', 'Dialog has .is-transit class just after click'
	casper.wait 750, ->
		test.assertNotVisible '.js-dialog', 'Dialog is not visible after transition ends'
		test.assertEval (->
			!(jQuery '.js-dialog').hasClass('is-transit')
		), '.is-transit class has been removed after transition but before fallback timeout'


	# Controls
	casper.thenClick '.js-control-link', ->
		test.assertSelectorHasText '.js-control-target',  '1two', 'Event was fired, arguments passed properly'

	# States
	casper.then ->
		test.assertEval (->
			!jQuery('<div class="test is-state1 js-test"></div>').toggleState('state1').hasClass('is-state1')
		), 'State was removed after toggleState call.'
		test.assertEval (->
			jQuery('<div class="test is-state1 js-test"></div>').toggleState('state2').hasClass('is-state2')
		), 'State was added after toggleState call.'
		test.assertEval (->
			jQuery('<div class="test is-state1 js-test"></div>').addState('state2').hasClass('is-state2')
		), 'State was added after addState call.'
		test.assertEval (->
			!jQuery('<div class="test is-state1 js-test"></div>').removeState('state1').hasClass('is-state1')
		), 'State was removed after removeState call.'
		test.assertEval (->
			jQuery('<div class="test is-state1 js-test"></div>').hasState('state1')
		), 'hasState returns true for existent state.'
		test.assertEval (->
			!jQuery('<div class="test is-state1 js-test"></div>').hasState('state2')
		), 'hasState returns false for non-existent state.'
		test.assertEval (->
			!jQuery('<div class="test js-test"></div>').hasState('any-state')
		), 'Everything is fine when there is no states on an element.'
		test.assertEval (->
			!jQuery('<div></div>').hasState('any-state')
		), 'Everything is fine when there is no classes on an element.'
	casper.thenEvaluate ->
		jQuery('.js-states').removeState('state1')
	casper.then ->
		test.assertEval (->
			!jQuery('.js-states').first().data('tamia-states').state1
		), 'State was removed from first element.'
		test.assertEval (->
			!jQuery('.js-states').last().data('tamia-states').state1
		), 'State was removed from second element.'
	casper.thenEvaluate ->
		jQuery('.js-states').addState('state2')
	casper.then ->
		test.assertEval (->
			jQuery('.js-states').first().data('tamia-states').state2
		), 'State was added to first element.'
		test.assertEval (->
			jQuery('.js-states').last().data('tamia-states').state2
		), 'State was added to second element.'

	# Animation manager
	casper.thenEvaluate ->
		jQuery('.js-animatable').trigger('animate.tamia', ['slideFast', -> window._animate_done = 1])
	casper.wait 50, ->
		test.assertNotVisible '.js-animatable', 'Element is hidden after animation ends (registered animation)'
		test.assertEval (->
			window._animate_done is 1
		), 'Callback was invoked after animation (registered animation)'
	casper.thenEvaluate ->
		jQuery('.js-animatable').trigger('animate.tamia', ['is-hidden', -> window._animate2_done = 2])
	casper.wait 50, ->
		test.assertEval (->
			jQuery('.js-animatable').hasState('hidden')
		), 'Element is hidden after animation ends (class animation)'
		test.assertEval (->
			window._animate2_done is 2
		), 'Callback was invoked after animation (class animation)'
	casper.thenEvaluate ->
		jQuery('.js-animatable').trigger('animate.tamia', [((elem, done) -> jQuery(elem).data('_animate3_done', 3); done()), (-> window._animate3_done = 3)])
	casper.wait 50, ->
		test.assertEval (->
			jQuery('.js-animatable').data('_animate3_done') is 3
		), 'Element is hidden after animation ends (custom function animation)'
		test.assertEval (->
			window._animate3_done is 3
		), 'Callback was invoked after animation (custom function animation)'


	# Component class
	casper.thenEvaluate ->
		window.cmpntElem = document.createElement 'div'
		window.cmpntElem.className = 'pony is-one is-two'
		window.cmpntElem.innerHTML = '<span class="js-elem">42</span>'
		window.cmpnt = new Test window.cmpntElem
	casper.then ->
		test.assertEval (-> !!cmpnt.elem.jquery), 'Component: elem is jQuery object'
		test.assertEval (-> cmpnt.elemNode.nodeType is 1), 'Component: elemNode is DOM node'
		test.assertEval (-> !!cmpnt.initializable), 'Component: component initializable'
		test.assertEval (-> cmpnt.elem.hasState 'ok'), 'Component: has ok state'
		test.assertEval (-> cmpnt.elem.hasClass 'is-ok'), 'Component: has .is-ok class'
		test.assertEval (-> cmpnt.elem.hasState('one') and cmpnt.elem.hasState('two')), 'Component: states imported from HTML'
		test.assertEval (-> cmpnt.elemNode.className is 'pony is-one is-two is-ok'), 'Component: all classes exists in HTML'
	casper.thenEvaluate ->
		cmpnt.elem.addState 'three'
		cmpnt.elem.toggleState 'two'
	casper.then ->
		test.assertEval (-> cmpnt.elem.hasState 'three'), 'Component: new state added'
		test.assertEval (-> not cmpnt.elem.hasState 'two'), 'Component: state toggled (removed)'
		test.assertEval (-> cmpnt.elemNode.className is 'pony is-one is-ok is-three'), 'Component: new state added to HTML'
	casper.thenEvaluate ->
		cmpnt.elem.removeState 'one'
		cmpnt.elem.toggleState 'two'
	casper.then ->
		test.assertEval (-> not cmpnt.elem.hasState 'one'), 'Component: state removed'
		test.assertEval (-> cmpnt.elem.hasState 'two'), 'Component: state toggled (added)'
		test.assertEval (-> cmpnt.elemNode.className is 'pony is-ok is-three is-two'), 'Component: state removed from HTML'
	casper.thenEvaluate ->
		cmpnt.reset()
		cmpnt.elem.find('.js-elem').trigger 'test1'
	casper.then ->
		test.assertEval (-> cmpnt.handled), 'Component: first event handled'
	casper.thenEvaluate ->
		cmpnt.reset()
		cmpnt.elem.find('.js-elem').trigger 'test2'
	casper.then ->
		test.assertEval (-> cmpnt.handled), 'Component: second event handled'
	casper.thenEvaluate ->
		cmpnt.detachFirstHandler()
		cmpnt.reset()
		cmpnt.elem.find('.js-elem').trigger 'test1'
	casper.then ->
		test.assertEval (-> not cmpnt.handled), 'Component: first event not handled after off() call'
	casper.thenEvaluate ->
		cmpnt.reset()
		cmpnt.elem.find('.js-elem').trigger 'test2'
	casper.then ->
		test.assertEval (-> cmpnt.handled), 'Component: second event still handled'
	casper.thenEvaluate ->
		cmpnt.detachSecondHandler()
		cmpnt.reset()
		cmpnt.elem.find('.js-elem').trigger 'test2'
	casper.then ->
		test.assertEval (-> not cmpnt.handled), 'Component: second event not handled after off() call'


	##########
	# Blocks #
	##########

	# Password
	casper.then ->
		test.assertEval (->
			(jQuery '.js-password').hasClass('is-ok')
		), 'Password: initialized'
		test.assertEvalEquals (->
			(jQuery '.js-password .password__field').attr('type')
		), 'password', 'Password: default input type is "password"'
	casper.thenEvaluate ->
		(jQuery '.js-password .password__field').focus()
		(jQuery '.js-password .password__toggle').mousedown()
	casper.then ->
		test.assertEval (->
			(jQuery '.js-password').hasClass('is-unlocked')
		), 'Password: container has class "is-unlocked"'
		test.assertEvalEquals (->
			(jQuery '.js-password .password__field').attr('type')
		), 'text', 'Password: input type is "text" after toggle'
		test.assertEval (->
			document.activeElement == (jQuery '.js-password .password__field')[0]
		), 'Password: input has focus'


	# Flippable
	casper.then ->
		test.assertEval (->
			!(jQuery '.js-flip').hasClass('is-flipped')
		), 'Flippable: not flipped by default'
	casper.thenEvaluate ->
		(jQuery '.js-flip').click()
	casper.then ->
		test.assertEval (->
			(jQuery '.js-flip').hasClass('is-flipped')
		), 'Flippable: flipped after click'


	# Select
	casper.thenEvaluate ->
		(jQuery '.js-select-component .js-select').val('dog').change()
	casper.then ->
		test.assertSelectorHasText '.js-select-component', 'Dog', 'Select: text in text box changed'
	casper.thenEvaluate ->
		(jQuery '.js-select-component .js-select').focus()
	casper.wait 50, ->
		test.assertEval (->
			(jQuery '.js-select-component').hasClass('is-focused')
		), 'Select: focused state set'
	casper.thenEvaluate ->
		(jQuery '.js-select-component .js-select').blur()
	casper.wait 50, ->
		test.assertEval (->
			!(jQuery '.js-select-component').hasClass('is-focused')
		), 'Select: focused state removed'

	# Spinner
	casper.thenClick '.js-loading-start', ->
		test.assertExists '.js-loaders div.loader-shade div.l-center div.l-center-i div.spinner.spinner_big', 'Spinner: HTML for loader shade and spinner was created'
		test.assertEval (-> (jQuery '.js-loaders').hasClass('is-loading')), 'Spinner: .is-loading class has been added to component'
		test.assertEval (-> (jQuery '.js-loaders').hasClass('loader-wrapper')), 'Spinner: .loader-wrapper class has been added to component'
	casper.wait 250, ->
		test.assertVisible '.js-loaders .loader-shade', 'Spinner: Loader shade is visible after click on a link'
	casper.thenClick '.js-loading-stop', ->
		test.assertEval (-> !(jQuery '.js-loaders').hasClass('is-loading')), 'Spinner: .is-loading class has been removed after click on a link'
	casper.wait 50, ->
		test.assertExists '.js-loaders .loader-shade', 'Spinner: HTML not removed until transitionend'
	casper.wait 250, ->
		test.assertNotExists '.js-loaders .loader-shade', 'Spinner: HTML was removed'
		test.assertEval (-> !(jQuery '.js-loaders').hasClass('loader-wrapper')), 'Spinner: .loader-wrapper class has been removed after click on a link'

	# Form
	casper.thenClick '.js-disable', ->
		test.assertEval (-> (jQuery '.js-form .js-field-1').hasClass('is-disabled')), 'Form: First field has class .is-disabled'
		test.assertEval (-> (jQuery '.js-form .js-field-2').hasClass('is-disabled')), 'Form: Second field has class .is-disabled'
		test.assertEval (-> (jQuery '.js-form .js-button-1').hasClass('is-disabled')), 'Form: Submit has class .is-disabled'
		test.assertEval (-> (jQuery '.js-form .js-field-1').prop('disabled')), 'Form: First field has disabled attribute'
		test.assertEval (-> (jQuery '.js-form .js-field-2').prop('disabled')), 'Form: Second field has disabled attribute'
		test.assertEval (-> (jQuery '.js-form .js-button-1').prop('disabled')), 'Form: Submit has disabled attribute'
	casper.thenClick '.js-enable', ->
		test.assertEval (-> !(jQuery '.js-form .js-field-1').hasClass('is-disabled')), 'Form: First field doesn’t have class .is-disabled'
		test.assertEval (-> !(jQuery '.js-form .js-field-2').hasClass('is-disabled')), 'Form: Second field doesn’t have class .is-disabled'
		test.assertEval (-> !(jQuery '.js-form .js-button-1').hasClass('is-disabled')), 'Form: Submit doesn’t have class .is-disabled'
		test.assertEval (-> !(jQuery '.js-form .js-field-1').prop('disabled')), 'Form: First field doesn’t have disabled attribute'
		test.assertEval (-> !(jQuery '.js-form .js-field-2').prop('disabled')), 'Form: Second field doesn’t have disabled attribute'
		test.assertEval (-> !(jQuery '.js-form .js-button-1').prop('disabled')), 'Form: Submit doesn’t have disabled attribute'

	# Preload
	casper.wait 250, ->
		test.assertEval (-> (window.preload_fired is true)), 'Preload: Image preloaded'
		test.assertEval (-> (window.preload_err is null)), 'Preload: No errors'


	casper.run ->
		test.done()
)
