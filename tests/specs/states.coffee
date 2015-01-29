'use strict'

describe 'states', ->
	before (done) ->
		requireModule 'states', (err, jQuery) ->
			global.$ = jQuery
			done()

	it 'exists', ->
		expect($).to.be.function
		expect($.fn.addState).to.be.function
		expect($.fn.removeState).to.be.function
		expect($.fn.toggleState).to.be.function
		expect($.fn.hasState).to.be.function

	it 'addState', ->
		elem = $('<div class="myblock"></div>')
		expect(elem.hasState('mystate')).to.be.false
		elem.addState('mystate')
		expect(elem.hasState('mystate')).to.be.true

	it 'removeState', ->
		elem = $('<div class="myblock is-mystate"></div>')
		expect(elem.hasState('mystate')).to.be.true
		elem.removeState('mystate')
		expect(elem.hasState('mystate')).to.be.false

	it 'toggleState', ->
		elem = $('<div class="myblock is-mystate"></div>')
		expect(elem.hasState('mystate')).to.be.true
		elem.toggleState('mystate')
		expect(elem.hasState('mystate')).to.be.false
		elem.toggleState('mystate')
		expect(elem.hasState('mystate')).to.be.true

	it 'removeState', ->
		elem = $('<div class="myblock is-mystate is-another"></div>')
		expect(elem.hasState('mystate')).to.be.true
		expect(elem.hasState('notmystate')).to.be.false
