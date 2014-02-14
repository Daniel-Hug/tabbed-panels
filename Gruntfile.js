module.exports = function(grunt) {
    'use strict';

    require('matchdep').filterDev('grunt-!(cli)').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        less: {
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: 'style.map'
                },
                files: {
                    'panels.css': 'panels.less',
                    'demo.css': 'demo.less'
                }
            }
        },
        watch: {
            all: {
                files: ['panels.less', 'demo.less'],
                tasks: ['less'],
            }
        }
    });

    grunt.registerTask('default', ['less', 'watch']);
};