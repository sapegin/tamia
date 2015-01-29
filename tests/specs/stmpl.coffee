'use strict'

describe 'stmpl', ->
	before (done) ->
		requireModule 'stmpl', done

	it 'exists', ->
		expect(stmpl).to.be.a.function

	it 'process', ->
		expect(stmpl('Hello {who}!', {who: 'world'})).to.equal('Hello world!')
