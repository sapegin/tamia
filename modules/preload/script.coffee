# Tâmia © 2013 Artem Sapegin http://sapegin.me
# Preload

'use strict'

$ = jQuery

preload = (images, callback) ->
	done = ->
		counter--
		callback(if errors.length then errors else null)  unless counter

	images = parse(images)
	counter = images.length
	errors = []
	for image, imageIdx in images
		img = new Image()
		img.onload = done
		img.onerror = ->
			errors.push(this.src)
			done()
		img.src = image

parse = (images) ->
	unless $.isArray(images) then images = [images]
	# TODO: img.attr('src')
	return images


tamia.preload = preload
