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
				'tamia/tamia.js',
				'blocks/*/*.js'
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
					'docs/styles.css': '__all.styl'
		watch:
			concat:
				files: '<%= concat.main.src %>'
				tasks: 'concat'
			stylus:
				files: [
					'tamia/**/*.styl',
					'specs/specs.styl'
				]
				tasks: 'stylus:specs'

	grunt.registerTask 'prepareStylus', ->
		blocks = grunt.file.expand 'blocks/*'
		blocks = ("@import \"#{name}\"" for name in blocks)
		styl = '@import "tamia"\n' + (blocks.join '\n')
		grunt.file.write '__all.styl', styl

	grunt.registerTask 'cleanup', ->
		grunt.file.delete '__all.styl'

	grunt.registerTask 'docs', ->
		readmes = grunt.file.expand 'blocks/*/Readme.md'
		html = _.map readmes, (name) ->
			return marked grunt.file.read name
		html = html.join '\n'
		#saveNormalHtml 'docs/blocks.html', html
		saveSourceHtml 'docs/index.html', html

	saveSourceHtml = (filename, html) ->
		template = grunt.file.read 'docs_src/source.html'
		html = grunt.template.process template, {data: {title: 'Test title', html: html}}
		grunt.file.write filename, html

	grunt.registerTask 'default', ['jshint', 'coffeelint', 'coffee', 'concat', 'prepareStylus', 'stylus', 'docs', 'cleanup']
