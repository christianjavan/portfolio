
module.exports = function (grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    app: 'app',
    dist: 'dist',
    useminPrepare: {
      html: 'app/index.html'
    },
    usemin: {
      html: ['<%= dist %>/**/*.html', '<%= dist %>/**/*.php'],
      css: ['<%= dist %>/css/**/*.css'],
      options: {
        dirs: ['<%= dist %>']
      }
    },
    /******************************************************/
    compass: {                  // Task
      dev: {                    // Another target
        options: {
          sassDir: '<%= app %>/scss',
          cssDir: '<%= app %>/css'
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
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({  browsers: ['last 2 versions', 'ie >= 9', '> 5%'] }), // add vendor prefixes
          //require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: '<%= app %>/css/app.css'
      }
    },
    /************************************************************/
    clean: {
      dist: {
        src: ["<%= dist %>/*"]
      }
    },
    /**************************************************************/
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app %>/',
          src: ['**/*.html', '**/*.php', '!**/*.scss','**/*.json','images/**/*'],
          dest: '<%= dist %>/'
        }]
      }
    },
    /******************************************************************/

  });
  /*Plugins de etapa de desarrollo*/
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  /*Plugins de etapa de distribucion*/
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('compile-sass', ['compass', 'postcss']);
  grunt.registerTask('default', ['compass:dev','browserSync', 'watch']);
  grunt.registerTask('build', ['compile-sass','clean','useminPrepare','copy', 'concat','cssmin','uglify','usemin']);
};
