module.exports = function(grunt) {
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015', 'react'],
      },
      js: {
        files: [{
          expand: true,
          cwd: 'jsx/',
          src: '**/*.jsx',
          dest: 'js/',
          ext: '.js',
        }],
      },
    },

    browserify: {
      dist: {
        files: {
          'dist/app.js': 'js/app.js',
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['babel', 'browserify']);
};