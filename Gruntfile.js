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
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
            },
            uses_defaults: ['src/**/*.js'],
        },

        open : {
            index : {
                path: 'http://localhost:9000/index.html'
            }
        },

        command : {
            build: {
                cmd: ['node r.js -o build.js']
            },
            proxy: {
                cmd: ['screen -S proxy -d -m node proxy-server.js']
            },
            server: {
                cmd: ['screen -S server -d -m python -m SimpleHTTPServer 9000']
            },
            test: {
                cmd: ['mocha-phantomjs tests/testRunner.html']
            },
            kill: {
                cmd: ['screen -X -S server quit', 'screen -X -S proxy quit']
            }
        }

    });

    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-commands');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('launch', ['command:proxy', 'command:server', 'open']);
    grunt.registerTask('kill', ['command:kill']);
};
