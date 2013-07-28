module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // This line makes your node configurations available for use
        pkg: grunt.file.readJSON('package.json'),
        // This is where we configure jshint
        jshint: {
            // You get to make the name
            // The paths tell jshint which files to validate
            all: ['app/**/*.js'],
            app: ['app/app.js']
        }
    });
    // Each plugin must be loaded following this pattern
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Custom task(s).
    // First argument names the task for use in command line
    // Second argument is a list of tasks to be run
    grunt.registerTask('myCustomTask', ['jshint:myFiles', 'plugin:someOtherTask']);

};