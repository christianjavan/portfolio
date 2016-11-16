module.exports = function (grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    app: 'app',
    dist: 'dist',
    /******************************************************/
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: '<%= app %>/scss',
          cssDir: '<%= dist %>/css',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: '<%= app %>/scss',
          cssDir: '<%= app %>/css',
          specify: '<%= app %>/scss/stylesheet.scss'
        }
      }
    },
    /*****************************************************/
    watch: {
      scss: {
        files: ['<%= app %>/scss/**/*.scss'],
        tasks: ['compass:dev'],
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['compass:dev'],
      }
    },
    /*****************************************************/
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            '<%= app %>/**/*.css',
            '<%= app %>/**/*.html',
            '<%= app %>/**/*.php',
            '<%= app %>/**/*.js',
            '<%= app %>/**/*.html',
            '<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}'
          ]
        }
      },
      options: {
        proxy: 'http://instamapjavan.com:88/portafolio/app/',
        watchTask: true
      }
    },
    /***********************************************************/
    postcss: {
      options: {
        map: true, // inline sourcemaps

        // or
        map: {
            inline: false, // save all sourcemaps as separate files...
            annotation: 'dist/css/maps/' // ...to the specified directory
        },

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({  browsers: ['last 2 versions', 'ie >= 9', '> 5%'] }), // add vendor prefixes
          //require('cssnano')() // minify the result
        ]
      },
      dev: {
        src: '<%= app %>/**/*.css'
      },
      dist: {
        src: '<%= dist %>/**/*.css'
      }
    }

  });
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.registerTask('default', ['compass:dev','browserSync', 'watch']);
  grunt.registerTask('publish', ['compass:dist']);

}
