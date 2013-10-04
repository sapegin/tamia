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
					urlfunc: 'embedurl'
				files:
					'specs/specs.css': 'specs/specs.styl'
			docs:
				options:
					paths: ['.']
					urlfunc: 'embedurl'
				files:
					'docs/styles.css': 'docs_src/docs.styl'
		casperjs:
			tests: 'tests/*.coffee'
		watch:
			options:
				livereload: true
			concat:
				files: '<%= concat.main.src %>'
				tasks: 'concat'
			stylus:
				files: [
					'tamia/**/*.styl',
					'blocks/**/*.styl',
					'specs/specs.styl'
					'docs_src/docs.styl'
				]
				tasks: 'stylus'


	marked.setOptions
		smartypants: true


	docsMenu =
		docs: 'Documentation'
		blocks: 'Blocks'


	grunt.registerTask 'docs', ->
		html = []

		# Index page
		readme = grunt.file.read 'Readme.md'
		readme = readme.replace /^[\S\s]*?##/, '##'
		readme = readme.replace /The MIT License, see the included `License.md` file./, 'The [MIT License](https://github.com/sapegin/tamia/blob/master/License.md).'
		saveHtml 'index', marked readme

		# Stylus modules
		modules = [
			'index',
			'layout',
			'links',
			'images',
			'misc',
			'functions',
			'classes'
		]
		for name in modules
			module = grunt.file.read "tamia/#{name}.styl"
			m = module.match /^.*?$\n^\/\/ (.*?)$/m
			module = docsProcessStylus module
			html.push (docsAppendTitle module, m[1])

		# JS core
		jscore = grunt.file.read 'tamia/tamia.js'
		jscore = docsProcessJs jscore
		html.push (docsAppendTitle jscore, 'JavaScript Helpers')

		saveHtml 'docs', marked html.join '\n\n'

		# Blocks
		readmes = grunt.file.expand 'blocks/*/Readme.md'
		html = _.map readmes, (name) ->
			return grunt.file.read name
		saveHtml 'blocks', marked html.join '\n\n'


	saveHtml = (name, html) ->
		template = grunt.file.read 'docs_src/template.html'
		html = grunt.template.process template, data: html: html, page: name, menu: docsMenu
		grunt.file.write "docs/#{name}.html", html

	docsProcessJs = (code) ->
		docs = []
		blocksRegEx = /\/\*\*([\S\s]*?)\*\/\s*(.*?)\n/mg
		while true
			matches = blocksRegEx.exec code
			break  unless matches
			text = matches[1]
			firstLine = matches[2]

			text = (text
				.replace(/\n\s*\* ?/mg, '\n')  # Clean up
				.replace(/^\s*/, '')  # Clean up
				.replace(/@param {(\w+)} ([-\w]+)/g, '* *$1* **$2**')  # Params
				.replace(/@param ([-\w]+)/g, '* **$1**')  # Params
				.replace(/^(.*?):$/mg, '##### $1')  # Sections
				.replace(/^  /mg, '    ')  # Code blocks
				.replace(/^    (\d+\.)/mg, '$1')  # Ordered lists
				)

			title = null
			m = /function (\w+)/.exec firstLine  # Function
			if m
				params = text.match /\* \*\*([a-z]+)(?=\*\*)/g
				params = _.map params, (param) -> (param.replace /^[*\s]*/, '')
				title = m[1] + '(' + (params.join ', ') + ')'
			m = /_handlers\.(\w+)'/.exec firstLine  # Event
			if m
				title = m[1]
			if title
				text = "#### #{title}\n\n#{text}"
			else
				# The first line is a title
				text = text.replace /\.$/m, ''  # Remove point at the end of the first line
				text = "#### #{text}"

			docs.push text

		docs.join '\n\n'

	docsProcessStylus = (code) ->
		# Remove header comment
		code = code.replace /^\/\/.*?\n\/\/.*?/, ''

		# Remove ///... comments
		code = code.replace /^\s*\/\/\/.*?$/mg, ''

		docs = []
		blocksRegEx = /\n((?:^[\t ]*\/\/.*?$\n)+)(^[^\/]+$)?/mg
		while true
			matches = blocksRegEx.exec code
			break  unless matches
			text = matches[1]
			firstLine = matches[2]

			# Heading
			m = text.match /^\s*\/\/\n\/\/\s*([-\. \w]+)\n\/\/\s*/
			if m
				docs.push "### #{m[1]}"
				continue

			text = (text
				.replace(/^\s*\/\/ ?/mg, '')  # Clean up
				.replace(/^\s*/, '')  # Clean up
				.replace(/^([-_\.a-z]+) - ([A-Z0-9])/mg, '* **$1** $2')  # Params
				.replace(/^(.*?):$/mg, '##### $1')  # Sections
				.replace(/^  /mg, '    ')  # Code blocks
				)

			title = null
			m = /^\s*([-\w]+)\([^)]*\)$/m.exec firstLine  # Function
			if m
				params = text.match /\* \*\*([a-z]+)(?=\*\*)/g
				params = _.map params, (param) -> (param.replace /^[*\s]*/, '')
				title = m[1] + '(' + (params.join ', ') + ')'
			m = /^\s*([-\w]+) \??=/m.exec firstLine  # Variable
			if m
				title = m[1]
			m = /^\s*(\.[-\w]+),?$/m.exec firstLine  # Class
			if m
				title = m[1]
			if title
				text = "#### #{title}\n\n#{text}"
			else
				# The first line is a title
				text = text.replace /\.$/m, ''  # Remove point at the end of the first line
				text = "#### #{text}"

			docs.push text

		docs.join '\n\n'

	docsAppendTitle = (text, title) ->
		"## #{title}\n\n#{text}"


	grunt.registerTask 'default', ['jshint', 'coffeelint', 'coffee', 'concat','stylus', 'docs', 'casperjs']
	grunt.registerTask 'build', ['coffee', 'concat', 'stylus', 'docs']
