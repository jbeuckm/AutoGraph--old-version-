
module.exports = function(grunt) {


  grunt.initConfig({
    jsdoc : {
      dist : {
        src: ['src/*.js', 'tests/*.js'],
        options: {
          destination: 'doc'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jsdoc');

};
