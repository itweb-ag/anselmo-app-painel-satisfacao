module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      main: {
        options: {
          optimization: 1
        },
        files: {"src/assets/css/main.css": "src/assets/css/less/main.less"}
      },
    },
    // concat: {
    //   css: {
    //     src: "styles/main.less.css",
    //     dest: "styles/main.css"
    //   },
    // },
    cssmin: {
      css: {
        src: "src/assets/css/main.css",
        dest: "src/main.min.css"
      }
    },
    watch: {
      css: {
        files: ["src/assets/css/less/*.less", "src/assets/css/less/*.css", "src/assets/css/less/inc/*.less", "src/assets/css/less/inc/**/*.less"],
        tasks: ["less:main", 'cssmin']
      },
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['less:main', 'cssmin', 'watch']);

};