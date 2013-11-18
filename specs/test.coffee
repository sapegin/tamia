# Tâmia © 2013 Artem Sapegin http://sapegin.me

'use strict'

#
# Hidden component
#
class Hidden extends Component
	init: ->
		@addState('pony')

	isInitializable: ->
		return @isVisible()

tamia.initComponents(hidden: Hidden)


#
# Unsupported component
#
class Unsupported extends Component
	init: ->
		@addState('pony')

	fallback: ->
		@addState('no-pony')

	isSupported: ->
		return false

tamia.initComponents(unsupported: Unsupported)


#
# Test component
#
class Test extends Component
	init: ->
		@reset()
		@on('test1', 'elem', @handler)
		@on('test2', 'elem', @handler)

	detachFirstHandler: ->
		@off('test1', 'elem', @handler)

	detachSecondHandler: ->
		@off('test2', 'elem', @handler)

	reset: ->
		@handled = false

	handler: ->
		@handled = true

window.Test = Test
