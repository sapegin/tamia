# Tâmia © 2013 Artem Sapegin http://sapegin.me
# Spinner

'use strict'

$ = jQuery


loaderWrapperClass = 'loader-wrapper'
loaderShadeSelector = '.loader-shade'
loaderTmpl = '''
<div class="loader-shade">
	<div class="l-center">
		<div class="l-center-i">
			<div class="spinner spinner_big"></div>
		</div>
	</div>
</div>
'''


class Loader extends Component
	init: ->
		@initHtml()
		setTimeout((=> @addState('loading')), 0)

	destroy: ->
		@removeState('loading')
		@elem.find(loaderShadeSelector).afterTransition(=>
			@elem.removeClass(loaderWrapperClass)
			@loader.remove()
		)

	initHtml: ->
		@elem.addClass(loaderWrapperClass)
		@loader = $(loaderTmpl)
		@elem.append(@loader)


# Events
tamia.registerEvents(
	'loading-start': (elem) ->
		container = $(elem)
		return  if container.data('loader')
		container.data('loader', new Loader(elem))

	'loading-stop': (elem) ->
		container = $(elem)
		loader = container.data('loader')
		return  if not loader
		loader.destroy()
		container.removeData('loader')
)
