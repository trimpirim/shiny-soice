module.exports = (grunt) ->
  grunt.initConfig
    coffee:
      compile:
        expand: true
        cwd: 'coffee/'
        src: ['**/*.coffee']
        dest: 'js/'
        ext: '.js'
        options:
          bare: true
          preserve_dirs: true 

    # grunt watch (or simply grunt)
    watch:
      coffee:
        files: '<%= coffee.compile.src %>'
        tasks: ['coffee']
      options:
        livereload: true
 
  # load plugins
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
 
  # tasks
  grunt.registerTask 'default', ['coffee', 'watch']    