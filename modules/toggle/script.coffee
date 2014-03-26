# Tâmia © 2014 Artem Sapegin http://sapegin.me
# Toggle

# TODO: Global events

'use strict'

$ = jQuery
_body = $('body')
_doc = $(document)


togglers = {
	hidden:
		set: (elem) ->
			elem.trigger('disappear.tamia')
		clear: (elem) ->
			elem.trigger('appear.tamia')
	disabled:
		set: (elem) ->
			elem.addClass('is-disabled')
			elem.prop('disabled', true)
		clear: (elem) ->
			elem.removeClass('is-disabled')
			elem.prop('disabled', false)
	_default:
		set: (elem, name) ->
			elem.addClass("is-#{name}")
		clear: (elem, name) ->
			elem.removeClass("is-#{name}")
}

hiddenEvents = 'appeared.tamia disappeared.tamia'


class Toggle
	constructor: (wrapper) ->
		@wrapper = wrapper
		@elems = @findElems()

	findElems: ->
		elems = []
		tags = @wrapper.find('[data-states]')
		tags.each((index, elem) =>
			elem = $(elem)
			console.log 'elem', elem[0].outerHTML
			elem.addClass('toggle-element')

			elems.push({
				elem: elem
				states: @parseState(elem.data('states'))
			})

			# Detect crossfade
			prev = elems[index-1]
			if prev
				parent = elem.parent()
				# Have the common parent and no other siblings
				if parent.children().length is 2 and parent[0] is prev.elem.parent()[0]
					prev.crossfade = true
		)
		return elems

	parseState: (data) ->
		statesData = {}
		data = data.replace(/\s+/g, '')
		states = data.split(';')
		for stateData in states
			[name, elemStates] = stateData.split(':')
			elemStates = elemStates.split(',')
			statesData[name] = {}
			for state in elemStates
				set = true
				if state[0] is '-'  # Negative state: visible:-hidden
					set = false
					state = state[1..]
				statesData[name][state] = set
		return statesData

	toggle: (link) ->
		actions = link.data('toggle')
		actions = @parseToggle(actions)
		for action of actions
			func = "#{action}States"
			throw new tamia.Error("Toggle: wrong action #{action}.", 'Available actions: toggle, set, clear.')  unless this[func]
			this[func](actions[action])

	parseToggle: (data) ->
		toggleData = {}
		data = data.replace(/\s+/g, '')
		actions = data.split(';')
		for action in actions
			[name, elemStates] = action.split(':')
			elemStates = elemStates.split(',')
			toggleData[name] = elemStates
		return toggleData

	hasStateClass: (state) ->
		return @wrapper.hasClass("state-#{state}")

	toggleStateClass: (state, set) ->
		return @wrapper.toggleClass("state-#{state}", set)

	toggleStates: (states) ->
		for state in states
			@toggleState(state)

	toggleState: (state) ->
		set = not @hasStateClass(state)
		@toggleStateClass(state, set)

		for elem, elemIdx in @elems
			elemStates = elem.states[state]
			continue  unless elemStates
			for elemState of elemStates
				toggler = @getToggler(elemState)
				action = if set is elemStates[elemState] then 'set' else 'clear'

				if elemState is 'hidden'
					# Crossfade
					next = @elems[elemIdx+1]
					if next and next.states[state][elemState] is not elemStates[elemState]
						visibleElem = if elem.elem[0].offsetHeight then elem.elem else next.elem
						position = visibleElem.position()
						position.width = visibleElem.width()
						parent = elem.elem.parent()
						parent.height(parent.height())
						elem.elem.css(position)
						next.elem.css(position)
						parent.addClass('toggle-crossfade-wrapper')
						elem.elem.one(hiddenEvents, ((elem, next, parent) ->
							elem.elem.off(hiddenEvents)
							setTimeout((->
								parent.height('')
								position = {left: '', top: '', width: ''}
								elem.elem.css(position)
								next.elem.css(position)
								parent.removeClass('toggle-crossfade-wrapper')
							), 100)
						).bind(this, elem, next, parent))

				toggler[action](elem.elem, elemState)

	getToggler: (state) ->
		return togglers[state] or togglers._default


_doc.on('click', '[data-toggle]', (event) ->
	elem = $(event.currentTarget)
	wrapper = elem.closest('.js-toggle-wrapper')
	throw new tamia.Error('Toggle: .js-toggle-wrapper not found.', elem)  unless wrapper.length

	toggle = wrapper.data('tamia-toggle')
	if not toggle
		toggle = new Toggle(wrapper)
		wrapper.data('tamia-toggle', toggle)

	toggle.toggle(elem)

	event.preventDefault()
)
