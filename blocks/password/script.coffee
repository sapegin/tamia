# Tâmia © 2013 Artem Sapegin http://sapegin.me
# Password field with toggle to show characters

'use strict'

supported = undefined

jQuery::tamiaPassword = ->
	# IE8+
	if supported is undefined
		supported = (((jQuery '<b>').html '<!--[if lte IE 8]><i></i><![endif]-->').find 'i').length isnt 1
	return this unless supported

	return @each ->
		container = jQuery this
		unlockedClass = 'is-unlocked'
		lockedType = 'password'
		unlockedType = 'text'
		toggle = container.find '.password__toggle'
		field = container.find '.password__field'
		locked = not container.hasClass unlockedClass

		container.addClass 'is-ok'

		# Mousedown instead of click to catch focused field
		toggle.mousedown ->
			focused = document.activeElement is field[0]
			locked = not locked
			fieldType = field.attr 'type'
			container.toggleClass unlockedClass, not locked
			if fieldType is lockedType and not locked
				field.attr 'type', unlockedType
			else if fieldType is unlockedType and locked
				field.attr 'type', lockedType
			if focused
				setTimeout (->
					field.focus()
				), 0

# Init component
utils.initComponents password: tamiaPassword: undefined
