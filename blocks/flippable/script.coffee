# Tâmia © 2013 Artem Sapegin http://sapegin.me
# Flippable pane

'use strict'

# Init component
tamia.initComponents flippable: (container) ->
	toggle = ->
		($ this).toggleClass 'is-flipped'

	container = ($ container)
	(container.find '.js-flip').click toggle
	(container.click toggle) if container.is '.js-flip'
