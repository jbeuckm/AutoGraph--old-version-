module.exports = function (grunt) {

    grunt.initConfig({

        jsdoc: {
            dist: {
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
                        'jQuery', 'angular', 'confirm', 'Backbone', 'define', 'd3'
                    ]
                }
            }
        },

        nodestatic: {
            server: {
                options: {
                    port: 9000,
                    keepalive: true
                }
            }
        },

        // this task
        command : {
            build: {
                cmd: ['node r.js -o build.js']
            },
            proxy: {
                cmd: ['node proxy-server.js']
            },
            open: {
                cmd: ['open http://localhost:9000']
            },
            test: {
                cmd: ['mocha-phantomjs tests/testRunner.html']
            }
        }

    });

    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-commands');
    grunt.loadNpmTasks('grunt-nodestatic');
};
