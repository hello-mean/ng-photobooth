'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    photobooth: {
      dist: 'dist',
      src: 'src'
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= photobooth.dist %>/*',
          ]
        }]
      },
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '<%= photobooth.src %>/{,*/}*.js'
      ]
    },
    // not used since Uglify task does concat,
    // but still available if needed
    concat: {
      dist: {
        src:['src/photobooth.js', 'src/*.js'],
        dest: 'dist/photobooth.js'
      }
    },
    // Put files not handled in other tasks here
    uglify: {
      dist: {
        files: {
          '<%= photobooth.dist %>/photobooth.js': [
          '<%= photobooth.dist %>/photobooth.js'
          ]
        }
      }
    },
    karma: {
      unit: {
        configFile: "karma.conf.js"
      }  
    }
  });

  grunt.registerTask('test', [
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'concat',
    'uglify',
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
