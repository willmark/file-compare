module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    preprocess : {
        js : {
            src : 'index.js',
            dest : 'src-pp/index.js'
        }
    },
    jshint : {
      'files': ['*.js']
    },
    nodeunit: {
      all: ['test.js']
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src-pp/**.js',
        dest: 'dist/file-compare.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //verify  script
  grunt.loadNpmTasks('grunt-contrib-jshint');

  //run tests
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Preprocessing to strip out development code
  grunt.loadNpmTasks('grunt-preprocess');
  

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'nodeunit', 'preprocess', 'uglify']);

};
