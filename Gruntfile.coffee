# gruntjs.com

module.exports = (grunt) ->
	fs = require 'fs'
	path = require 'path'
	marked_lib = require 'marked'
	hljs = require 'highlight.js'
	Sequelize = require 'sequelize'
	_ = require 'lodash'
	_.str = require 'underscore.string'

	require('load-grunt-tasks')(grunt)

	grunt.initConfig
		concat:
			docs:
				src: [
					'vendor/transition-events.js'
					'tamia/tamia.js'
					'tamia/opor.js'
					'tamia/component.js'
					'modules/*/*.js'
					'docs_src/lib/*.js'
					'docs_src/docs.js'
				]
				dest: 'docs/scripts.js'
			specs:
				src: [
					'vendor/transition-events.js'
					'tamia/tamia.js'
					'tamia/opor.js'
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
					-> (require 'stylobuild')({
						autoprefixer:
							# `android >= 4` adds legacy flexbox for PhantomJS
							browsers: 'last 2 versions, ie 9, android >= 4'
						csso: false
						pixrem: false
					})
				]
			specs:
				files:
					'specs/specs.css': 'specs/specs.styl'
			docs:
				files:
					'docs/styles.css': 'docs_src/docs.styl'
		copy:
			favicon:
				src: 'docs_src/favicon.ico'
				dest: 'docs/favicon.ico'
			dash_manifest:
				src: 'docs_src/Info.plist'
				dest: 'Tamia.docset/Contents/Info.plist'
			dash_icon:
				src: 'docs_src/icon.png'
				dest: 'Tamia.docset/icon.png'
			dash_css:
				src: 'docs/styles.css'
				dest: 'Tamia.docset/Contents/Resources/Documents/styles.css'
		clean:
			tests: [
				'tests/failures'
			]
		casper:
			options:
				test: true
			js:
				src: 'tests/tests.coffee'
			css:
				src: 'tests/css.coffee'
			css_styles:
				src: 'tests/css-styles.coffee'
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


	# Hightlight.js

	hljs.configure({
		classPrefix: ''
		tabReplace: '<span class="indent">\t</span>'
	})


	# Marked

	marked_lib.setOptions({
		smartypants: true
	})

	renderer = new marked_lib.Renderer()
	renderer.code = (text, language) ->
		blocks = text.split('\n\n')
		blocks = _.map(blocks, highlightCode)
		return blocks.join('\n\n')

	marked = (text) ->
		return marked_lib(text, {renderer: renderer})


	docsMenu =
		docs: 'Documentation'
		modules: 'Modules'

	dashList = []


	grunt.registerTask 'docs', ->
		done = this.async()

		html = []

		# Index page
		readme = grunt.file.read 'Readme.md'
		readme = readme.replace /^[\S\s]*?##/, '##'
		readme = readme.replace /The MIT License, see the included `License.md` file./, 'The [MIT License](https://github.com/tamiadev/tamia/blob/master/License.md).'
		saveHtml 'index', marked readme

		# Stylus modules
		modules = [
			'index',
			'layout',
			'links',
			'images',
			'mediaqueries',
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

		# OPORJSON
		opor = grunt.file.read 'tamia/opor.js'
		opor = docsProcessJs opor
		html.push (docsAppendTitle opor, 'OPORJSON API')

		saveHtml 'docs', marked html.join '\n\n'

		# Modules
		modules = grunt.file.expand 'modules/*'
		exampleId = 0
		html = _.map modules, (module) ->
			name = module.split('/')[1]
			moduleDoc = grunt.file.read path.join(module, 'Readme.md')
			moduleDoc = moduleDoc.replace(/^# (.*?)$/gm, (m, title) -> docsMakeTitle(title, name, 2))  # Main heading
			moduleDoc = moduleDoc.replace(/^#/gm, '##')  # Increase headings level
			moduleDoc = marked moduleDoc

			# Examples
			examplesFile = path.join module, 'example.html'
			if fs.existsSync examplesFile
				moduleDoc += "\n\n<h3>Examples</h3>\n\n"
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
					exampleCode = highlightCode exampleCode

					return """
						<div class="example">#{exampleHtml}</div>
						<div class="example-code">
							<div class="example-code__link"><span class="link" data-fire="toggle.tamia" data-target="#example_#{exampleId}">Show/hide code</span></div>
							<div class="is-hidden" id="example_#{exampleId}">
								#{exampleCode}
							</div>
						</div>
					"""

				moduleDoc += examples.join '\n\n'

				dashList.push [name, 'Package', "modules.html##{name}"]

			return moduleDoc
		saveHtml 'modules', html.join '\n\n'

		docsDashIndexDb(done)


	highlightCode = (code) ->
		hl = hljs.highlightAuto(code, ['html', 'scss', 'css', 'javascript'])
		return """<pre><code class="#{hl.language}">#{hl.value}</code></pre>"""

	saveHtml = (name, html) ->
		html = (html
			# Fix BEM style names in headings
			.replace(/(<h\d[^>]*>)(.*?)(<\/h\d>)/g, (m, open, contents, close) -> open + contents.replace(/<\/?strong>/g, '__') + close)
		)

		context = data: html: html, page: name, menu: docsMenu

		# Site
		template = grunt.file.read 'docs_src/template.html'
		pageHtml = grunt.template.process template, context
		grunt.file.write "docs/#{name}.html", pageHtml

		# Dash docset
		template = grunt.file.read 'docs_src/dash.html'
		pageHtml = grunt.template.process template, context
		grunt.file.write "Tamia.docset/Contents/Resources/Documents/#{name}.html", pageHtml

	docsProcessJs = (code) ->
		# HACK: Add kinda separators after section titles so blocksRegEx not skip first blocks in every section
		code = code.replace(/(\/\*\*\n\s*\* ([^\n]*)\n\s*\*\/\n\n)/mg, '$1\n_\n')

		docs = []
		blocksRegEx = /\/\*\*([\S\s]*?)\*\/\s*(.*?)(?=\n)/mg
		className = null
		while true
			matches = blocksRegEx.exec code
			break  unless matches
			text = matches[1]
			firstLine = matches[2]

			text = (text
				.replace(/\n\s*\* ?/mg, '\n')  # Clean up
				.replace(/^\s*/, '')  # Clean up
				.replace(/^\- (.*?) \-/mg, '- **$1** —')  # Lists
			)

			text = docsFormatJsDoc text

			# Class
			isClass = false
			if /@class\s/.exec text
				isClass = true
				text = text.replace /^@class\s+/mg, ''

			title = null
			name = null
			m = /@event ([\w\.]+)/.exec text  # Event
			if m
				title = m[1]
				text = text.replace /^@event.*$/mg, ''
				dashList.push [title, 'Event', "docs.html##{title}"]
			m = /@type \{[\w\|]+\}/.exec text  # Variable
			if not title and m
				m  = /(\w+):/.exec firstLine
				title = "#{className}.#{m[1]}"
				text = text.replace /^@type.*$/mg, ''
				dashList.push [title, 'Property', "docs.html##{title}"]
			m = /(?:function (\w+))|(?:(\w+): )|(?:([\w\.]+) = function)/.exec firstLine  # Function
			if not title and m
				params = text.match /\* \*\*([a-z0-9_\[\]\.]+)(?=\*\*)/gi
				params = _.map params, (param) -> (param.replace /^[*\s]*/, '')
				name = (m[1]||m[2]||m[3])
				type = null
				if isClass  # Class
					className = name
					type = 'Class'
				else if /\w: function/.exec firstLine  # Method
					name = "#{className}.#{name}"
					type = 'Method'
				else  # Function
					type = 'Function'
				title = name + '(' + (params.join ', ') + ')'
				dashList.push [name, type, "docs.html##{name}"]
			if title
				text = docsMakeTitle(title, name or title) + "\n\n#{text}"
			else
				# The first line is a title
				text = text.replace /\.$/m, ''  # Remove point at the end of the first line
				text = "### #{text}"
				title2 = text.split(/\n/)[0].replace(/^### /, '').replace(/\s/g, '-').toLowerCase()

			# Attribute
			m = /@attribute ([\w\-]+)/.exec text
			if m
				name = name or title2
				dashList.push [m[1], 'Attribute', "docs.html##{name}"]
				text = text.replace /^@attribute\s+/mg, ''

			docs.push text

		docs.join '\n\n'

	docsFormatJsDoc = (text) ->
		text
			.replace(/^\t*/mg, '')  # Clean up
			.replace(/@param {(\w+)} ([-\w\[\]\.]+)/g, '* *$1* **$2**:')  # Params
			.replace(/@param ([-\w\[\]]+)/g, '* **$1**:')  # Params
			.replace(/@returns? {(\w+)}(.)/g, '\n\nReturns *$1*: ')  # Returns
			.replace(/@returns? {(\w+)}/g, '\n\nReturns *$1*.')  # Returns
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
				.replace(/^([-_\.a-z]+) - (.*?\.)/mgi, '* **$1** $2')  # Params
				.replace(/^(.*?):$/mg, '##### $1')  # Sections
				.replace(/^  /mg, '    ')  # Code blocks
				)

			name = null
			title = null
			m = /^\s*([-\w]+)\([^)]*\)$/m.exec firstLine  # Function
			if m
				params = text.match /\* \*\*([a-z]+)(?=\*\*)/gi
				params = _.map params, (param) -> (param.replace /^[*\s]*/, '')

				# Custom titles
				titles = text.match /^# (.*?)$/mg
				if titles
					name = titles[0].replace(/^# ([\w\-]+).*$/, '$1')
					title = _.map(titles, (title) -> title.replace /^# /, '').join('<br>')
					text = text.replace /^# .*?$/mg, ''
				else
					name = m[1]
					title = name + '(' + (params.join ', ') + ')'
				dashList.push [name, 'Mixin', "docs.html##{name}"]
			m = /^\s*([-\w]+) \??=/m.exec firstLine  # Variable
			if not title and m
				title = m[1]
				dashList.push [title, 'Global', "docs.html##{title}"]
			m = /^\s*(\.[-\w]+),?$/m.exec firstLine  # Class
			if not title and m
				title = m[1]
				dashList.push [title, 'Style', "docs.html##{title}"]
			if title
				text = docsMakeTitle(title, name or title) + "\n\n#{text}"
			else
				# The first line is a title
				text = text.replace /\.$/m, ''  # Remove point at the end of the first line
				text = "#### #{text}"

			docs.push text

		docs.join '\n\n'

	docsAppendTitle = (text, title) ->
		"## #{title}\n\n#{text}"

	docsMakeTitle = (text, id, level = 4) ->
		id = id.replace(/\s/g, '-')
		"<h#{level} id='#{id}'>#{text}</h#{level}>"

	docsDashIndexDb = (done) ->
		rows = []
		dashList.forEach (item) ->
			rows.push({name: item[0], type: item[1], path: item[2]})

		sequelize = new Sequelize('database', 'username', 'password', {
			dialect: 'sqlite'
			storage: 'Tamia.docset/Contents/Resources/docSet.dsidx',
			logging: false
		})

		SearchIndex = sequelize.define('searchIndex', {
			id: {
				type: Sequelize.INTEGER
				autoIncrement: true
			}
			name: {
				type: Sequelize.STRING
			}
			type: {
				type: Sequelize.STRING
			}
			path: {
				type: Sequelize.STRING
			}
		}, {
			freezeTableName: true
			timestamps: false
		})

		sequelize.sync({force: true}).success(->
			SearchIndex.bulkCreate(rows)
				.success(done)
				.error((message) ->
					console.log 'Error when saving Dash index:', message
					done()
				)
		)

	grunt.registerTask 'test', ['clean', 'casper']
	grunt.registerTask 'test:js', ['casper:js']
	grunt.registerTask 'test:css', ['clean', 'casper:css']
	grunt.registerTask 'test:css_styles', ['clean', 'casper:css_styles']
	grunt.registerTask 'default', ['concat', 'stylus', 'docs', 'copy', 'test']
	grunt.registerTask 'build', ['concat', 'stylus', 'docs', 'copy']
