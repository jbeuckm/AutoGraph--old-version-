
module.exports = function(grunt) {

  grunt.initConfig({
    jsdoc : {
      dist : {
        src: ['src/*.js', 'src/components', 'src/collections', 'src/models', 'views'],
        options: {
          destination: 'doc',
          configure: 'jsdoc.conf.json'
        }
      }
    },

      jslint: { // configure the task
          client: {
              src: [
                  'src/**/*.js'
              ],
              exclude: [
                  'src/lib/*.js'
              ],
              directives: {
                  browser: true,
                  predef: [
                      'jQuery', 'angular', 'confirm', 'Backbone', 'define', 'requirejs'
                  ]
              }
          }
      }

  });

  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-jslint');

};
