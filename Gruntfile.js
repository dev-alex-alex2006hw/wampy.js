module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['dist/*']
        },
        babel: {
            srcToDist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.js', '!browser.js'],
                    dest: 'dist/'
                }]
            }
        },
        browserify: {
            dist4Browser: {
                options     : {
                    transform: [['babelify', { 'presets': ['es2015'] }]]
                },
                files  : {
                    'dist/browser/wampy.js': 'src/browser.js'
                }
            }
        },
        uglify: {
            options: {
                compress: {
                    drop_console: true
                },
                preserveComments: false,
                sourceMap: true
            },
            dist4Browser: {
                files: {
                    'dist/browser/wampy.min.js': ['dist/browser/wampy.js']
                }
            }
        },
        copy: {
            msgpackToDist: {
                files: [{
                    src: ['node_modules/msgpack5/dist/msgpack5.min.js'],
                    dest: 'dist/browser/msgpack5.min.js'
                }]
            }
        },
        concat: {
            concatWampyMsgpack: {
                src: ['dist/browser/msgpack5.min.js', 'dist/browser/wampy.min.js'],
                dest: 'dist/browser/wampy-all.min.js'
            }
        }
    });

    grunt.registerTask('default', ['clean', 'babel', 'browserify', 'uglify', 'copy', 'concat']);
};
