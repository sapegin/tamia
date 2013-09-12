# gruntjs.com

module.exports = (grunt) ->
	marked = require 'marked'
	_ = grunt.util._

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

	grunt.initConfig
		jshint:
			options:
				jshintrc: '.jshintrc'
			files: [
				'tamia/tamia.js'
			]
		coffeelint:
			all:
				options:
					no_tabs: false
				files: 'blocks/*/*.coffee'
		coffee:
			compile:
				expand: true,
				cwd: 'blocks',
				src: ['*/*.coffee'],
				dest: 'blocks',
				ext: '.js'
		concat:
			specs:
				src: [
					'tamia/tamia.js',
					'blocks/*/*.js'
				]
				dest: 'specs/specs.js'
			main:
				src: [
					'tamia/tamia.js',
					'blocks/*/*.js'
				]
				dest: 'docs/scripts.js'
		stylus:
			specs:
				options:
					paths: ['.']
				files:
					'specs/specs.css': 'specs/specs.styl'
			docs:
				options:
					paths: ['.']
				files:
					'docs/styles.css': 'docs_src/docs.styl'
		casperjs:
			tests: 'tests/*.coffee'
		watch:
			concat:
				files: '<%= concat.main.src %>'
				tasks: 'concat'
			stylus:
				options:
					livereload: true
				files: [
					'tamia/**/*.styl',
					'blocks/**/*.styl',
					'specs/specs.styl'
					'docs_src/docs.styl'
				]
				tasks: 'stylus'

	marked.setOptions
		smartypants: true

	grunt.registerTask 'docs', ->
		html = []

		# JS core
		jscore = grunt.file.read 'tamia/tamia.js'
		jscore = docsProcessJs jscore
		html.push (docsAppendTitle jscore, 'JavaScript Helpers')

		# readmes = grunt.file.expand 'blocks/*/Readme.md'
		# html = _.map readmes, (name) ->
		# 	return grunt.file.read name

		saveHtml 'docs/index.html', marked html.join '\n\n'

	saveHtml = (filename, html) ->
		template = grunt.file.read 'docs_src/template.html'
		html = grunt.template.process template, data: html: html
		grunt.file.write filename, html


	docsProcessJs = (code) ->
		docs = []
		blocksRegEx = /\/\*\*([\S\s]*?)\*\/\s*(.*?)\n/mg
		while true
			matches = blocksRegEx.exec code
			break  unless matches
			text = matches[1]
			firstLine = matches[2]

			text = text.replace /\n\s*\* ?/mg, '\n'  # Clean up
			text = text.replace /^\s*/, ''  # Clean up
			text = text.replace /@param {(\w+)} ([-\w]+)/g, '* *$1* **$2**'  # Params
			text = text.replace /@param ([-\w]+)/g, '* **$1**'  # Params
			text = text.replace /^(.*?):$/mg, '#### $1'  # Sections
			text = text.replace /^  /mg, '    '  # Code blocks
			text = text.replace /^    (\d+\.)/mg, '$1'  # Ordered lists

			title = null
			m = /function (\w+)/.exec firstLine
			if m
				title = m[1]
			m = /jQuery\(\w+?\).on\('(\w+?.tamia)'/.exec firstLine
			if m
				title = m[1]
			if title
				text = "### #{title}\n\n#{text}"
			else
				# The first line is a title
				text = text.replace /\.$/m, ''  # Remove point at the end of the first line
				text = "### #{text}"

			docs.push text

		docs.join '\n\n'

	docsAppendTitle = (text, title) ->
		"## #{title}\n\n#{text}"


	grunt.registerTask 'default', ['jshint', 'coffeelint', 'coffee', 'concat','stylus', 'docs', 'casperjs']
	grunt.registerTask 'build', ['coffee', 'concat', 'stylus', 'docs']
