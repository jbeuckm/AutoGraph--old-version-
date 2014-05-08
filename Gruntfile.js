
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
    }
  });

  grunt.loadNpmTasks('grunt-jsdoc');

};
