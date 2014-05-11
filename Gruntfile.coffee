# gruntjs.com

module.exports = (grunt) ->
	fs = require 'fs'
	path = require 'path'
	marked = require 'marked'
	_ = require 'lodash'
	_.str = require 'underscore.string'

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

	grunt.initConfig
		jshint:
			options:
				jshintrc: '.jshintrc'
			files: [
				'tamia/*.js'
				'modules/*/*.js'
			]
		coffeelint:
			options:
				configFile: 'coffeelint.json'
			files: [
				'Gruntfile.coffee'
				'tests/*.coffee'
			]
		concat:
			docs:
				src: [
					'vendor/transition-events.js'
					'tamia/tamia.js'
					'tamia/component.js'
					'modules/*/*.js'
					'docs_src/fixie.js'
				]
				dest: 'docs/scripts.js'
			specs:
				src: [
					'vendor/transition-events.js'
					'tamia/tamia.js'
					'tamia/component.js'
					'modules/*/*.js'
					'specs/test.js'
				]
				dest: 'specs/specs.js'
		stylus:
			options:
				paths: ['.']
				urlfunc: 'embedurl'
				use: [
					-> (require 'autoprefixer-stylus')('last 2 versions', 'ie 8', 'ie 9')
				]
			specs:
				files:
					'specs/specs.css': 'specs/specs.styl'
			docs:
				files:
					'docs/styles.css': 'docs_src/docs.styl'
		casperjs:
			options:
				async:
					parallel: true
			tests: 'tests/*.coffee'
		watch:
			livereload:
				options:
					livereload: true
				files: [
					'<%= concat.specs.dest  %>'
					'<%= concat.docs.dest  %>'
					'specs/specs.css'
					'docs/styles.css'
				]
			concat:
				options:
					atBegin: true
				files: [
					'<%= concat.docs.src %>'
					'<%= concat.specs.src %>'
				]
				tasks: 'concat'
			stylus:
				options:
					atBegin: true
				files: [
					'tamia/**/*.styl'
					'modules/**/*.styl'
					'specs/specs.styl'
					'docs_src/docs.styl'
				]
				tasks: 'stylus'


	marked.setOptions
		smartypants: true


	docsMenu =
		docs: 'Documentation'
		modules: 'Modules'


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

		# Component
		component = grunt.file.read 'tamia/component.js'
		component = docsProcessJs component
		html.push (docsAppendTitle component, 'Base JavaScript Component Class')

		saveHtml 'docs', marked html.join '\n\n'

		# Modules
		modules = grunt.file.expand 'modules/*'
		exampleId = 0
		html = _.map modules, (module) ->
			moduleDoc = marked grunt.file.read path.join(module, 'Readme.md')
			# Examples
			examplesFile = path.join module, 'example.html'
			if fs.existsSync examplesFile
				moduleDoc += "\n\n<h2>Examples</h2>\n\n"
				examples = grunt.file.read examplesFile
				examples = examples.split '\n\n'
				examples = _.map examples, (example) ->
					exampleId += 1
					exampleHtml = example
					exampleCode = (example
						.replace(/\s?fixie([^>]+>)</g, '$1...<')
						.replace(/\s?fixie/g, '')
						.replace(/\s?class=""/g, '')
						.replace(/http:\/\/placedog.com[^"]+/g, '...')
						.replace(/\s?style=\"[^\"]*\"/g, '')
					)
					exampleCode = _.str.escapeHTML exampleCode

					return """
						<div class="example">#{exampleHtml}</div>
						<div class="example-code">
							<div class="example-code__link"><span class="link" data-fire="toggle.tamia" data-target="#example_#{exampleId}">Show/hide code</span></div>
							<div class="is-hidden" id="example_#{exampleId}">
								<pre><code class="html">#{exampleCode}</code></pre>
							</div>
						</div>
					"""

				moduleDoc += examples.join '\n\n'

			return moduleDoc
		saveHtml 'modules', html.join '\n\n'


	saveHtml = (name, html) ->
		html = (html
			# Fix BEM style names in headings
			.replace(/(<h\d[^>]*>)(.*?)(<\/h\d>)/g, (m, open, contents, close) -> open + contents.replace(/<\/?strong>/g, '__') + close)
		)
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
			)

			text = docsFormatJsDoc text

			title = null
			m = /(?:function (\w+))|(?:(\w+): )|(?:([\w\.]+) = function)/.exec firstLine  # Function
			if m
				params = text.match /\* \*\*([a-z\[\]]+)(?=\*\*)/g
				params = _.map params, (param) -> (param.replace /^[*\s]*/, '')
				title = m[1]||m[2]||m[3] + '(' + (params.join ', ') + ')'
			m = /_handlers\.(\w+)/.exec firstLine  # Event
			if not title and m
				title = m[1]
			if title
				text = "#### #{title}\n\n#{text}"
			else
				# The first line is a title
				text = text.replace /\.$/m, ''  # Remove point at the end of the first line
				text = "#### #{text}"

			docs.push text

		docs.join '\n\n'

	docsFormatJsDoc = (text) ->
		text
			.replace(/^\t*/mg, '')  # Clean up
			.replace(/@param {(\w+)} ([-\w\[\]]+)/g, '* *$1* **$2**:')  # Params
			.replace(/@param ([-\w\[\]]+)/g, '* **$1**:')  # Params
			.replace(/@returns? {(\w+)}(.)/g, 'Returns *$1*:')  # Returns
			.replace(/@returns? {(\w+)}/g, 'Returns *$1*.')  # Returns
			.replace(/^(.*?):$/mg, '##### $1')  # Sections
			.replace(/^  /mg, '    ')  # Code blocks
			.replace(/^    (\d+\.)/mg, '$1')  # Ordered lists

	docsProcessStylus = (code) ->
		# Remove header comment
		code = code.replace /^\/\/.*?\n\/\/.*?/, ''

		# Remove ///... comments
		code = code.replace /^\s*\/\/\/.*?$/mg, ''

		docs = []
		blocksRegEx = /\n((?:^[\t ]*\/\/.*?$\n)+)(^.*?$)?/mg
		while true
			matches = blocksRegEx.exec code
			break  unless matches
			text = matches[1]
			firstLine = matches[2]?.split('\n')[0]

			# Heading
			m = text.match /^\s*\/\/\n\/\/\s*([-\. \w]+)\n\/\/\s*/
			if m
				docs.push "### #{m[1]}"
				continue

			text = (text
				.replace(/^\s*\/\/ ?/mg, '')  # Clean up
				.replace(/^\s*/, '')  # Clean up
				.replace(/^([-_\.a-z]+) - (.*?\.)/mg, '* **$1** $2')  # Params
				.replace(/^(.*?):$/mg, '##### $1')  # Sections
				.replace(/^  /mg, '    ')  # Code blocks
				)

			title = null
			m = /^\s*([-\w]+)\([^)]*\)$/m.exec firstLine  # Function
			if m
				params = text.match /\* \*\*([a-z]+)(?=\*\*)/g
				params = _.map params, (param) -> (param.replace /^[*\s]*/, '')

				# Custom titles
				titles = text.match /^# (.*?)$/mg
				if titles
					title = _.map(titles, (title) -> title.replace /^# /, '').join('<br>')
					text = text.replace /^# .*?$/mg, ''
				else
					title = m[1] + '(' + (params.join ', ') + ')'
			m = /^\s*([-\w]+) \??=/m.exec firstLine  # Variable
			if not title and m
				title = m[1]
			m = /^\s*(\.[-\w]+),?$/m.exec firstLine  # Class
			if not title and m
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


	grunt.registerTask 'test', ['casperjs']
	grunt.registerTask 'default', ['jshint', 'coffeelint', 'concat', 'stylus', 'docs', 'test']
	grunt.registerTask 'build', ['concat', 'stylus', 'docs']
