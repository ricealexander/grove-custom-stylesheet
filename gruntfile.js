module.exports = grunt => {
  grunt.loadNpmTasks('grunt-sass')          // sass
  grunt.loadNpmTasks('grunt-postcss')       // postcss
  grunt.loadNpmTasks('grunt-contrib-watch') // watch

  grunt.initConfig({
    sass: {
      options: {
        implementation: require('node-sass'),
      },
      dist: {
        files: { 'dist/custom-stylesheet.css': 'sass/index.scss' },
      },
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')(),
          require('cssnano')(),
        ],
      },
      dist: {
        src: 'dist/*.css',
      },
    },

    watch: {
      sass: {
        files: 'sass/**',
        tasks: ['clean', 'sass', 'postcss'],
        options: { livereload: true },
      },
    },
  })

  grunt.registerTask('clean', 'Remove the dist directory', () => {
    grunt.file.delete('./dist')
  })

  grunt.registerTask('default', ['clean', 'sass', 'postcss'])
}
