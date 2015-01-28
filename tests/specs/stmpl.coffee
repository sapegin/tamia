'use strict'

stmpl = require 'stmpl'

describe 'stmpl', ->

	it 'exists', (done) ->
		expect(stmpl).to.be.a.function
		done()

	it 'process', (done) ->
		expect(stmpl('Hello {who}!', {who: 'world'})).to.equal('Hello world!')
		done()
