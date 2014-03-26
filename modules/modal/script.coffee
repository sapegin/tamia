# Tâmia © 2013 Artem Sapegin http://sapegin.me
# Modal

'use strict'

$ = jQuery
_body = $('body')
_doc = $(document)

_bodyClass = 'modal-opened'
_switchingClass = 'is-switching'
_hiddenClass = 'is-hidden'
_wrapperTmpl = '''
<div class="modal-shade is-hidden">
	<div class="l-center">
		<div class="l-center-i js-modal"></div>
	</div>
</div>
'''
_opened = null


class Modal extends Component
	init: ->
		@elem.data('modal', this)
		@on('click', 'modal-commit', @commit)
		@on('click', 'modal-dismiss', @dismiss)
		@keyup_ = @keyup.bind(this)
		@open()  if @elem.data('modal-open')

	initHtml: ->
		return  if @wrapper
		@wrapper = $(_wrapperTmpl)
		@wrapper.find('.js-modal').append(@elem)
		@wrapper.on('click', @shadeClick.bind(this))
		_body.append(@wrapper)
		@removeState('hidden')

	open: ->
		return  if this is _opened
		opened = _opened
		@initHtml()
		_body.addClass(_bodyClass)
		if opened
			opened.close(hide=true)
			@wrapper.addClass(_switchingClass)
			@wrapper.on('appeared.tamia', =>
				@wrapper.removeClass(_switchingClass)
				opened.wrapper.addClass(_hiddenClass)
				opened.elem.removeClass(_hiddenClass)
			)
		@wrapper.trigger('appear.tamia')
		_doc.on('keyup', @keyup_)
		_opened = this

	close: (hide=false) ->
		elem = if hide then @elem else @wrapper
		elem.trigger('disappear.tamia')
		_body.removeClass(_bodyClass)  unless hide
		_doc.off('keyup', @keyup_)
		_opened = null

	commit: (event) ->
		@done(event, 'commit')

	dismiss: (event) ->
		@done(event, 'dismiss')

	done: (event, type) ->
		event?.preventDefault()

		typeEvent = $.Event(type + '.modal.tamia')
		@elem.trigger(typeEvent)
		return  if typeEvent.isDefaultPrevented()

		@close()

	keyup: (event) ->
		if event.which is 27  # Escape
			@dismiss(event)

	shadeClick: (event) ->
		if $(event.target).hasClass('js-modal')
			@dismiss(event)


# Events
tamia.registerEvents(
	'open.modal': (elem) ->
		container = $(elem)
		modal = container.data('modal')
		unless modal
			modal = new Modal(elem)
		modal.open()
)
