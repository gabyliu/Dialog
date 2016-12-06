module.exports = function(grunt) {
    // 注册任务
    grunt.registerTask('w', ['copy:main', 'react', 'connect:server', 'watch']);
    // 配置
    require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', '@*/grunt-*']});
    var timer = require("grunt-timer");
    module.exports = function (grunt) {
        timer.init(grunt, {
            deferLogs: true,
            friendlyTime: true,
            color: "blue"
        });
    };
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),

        copy: {
            main: {
                files: [//用在大的编译上
                    {//js,image copy
                        expand: true,
                        cwd: 'src/',
                        src: ['**/*', '!**/*.less', '!**/*.jsx'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        react: {
            option:{
                es6module: true
            },
            dynamic_mappings: {
                files: [{
                    expand: true,
                    filter: 'isFile',
                    cwd: 'src/',
                    src: ['**/*.jsx'],
                    dest: 'dist/',
                    ext: '.js'
                }]
            }
        },

        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
                    livereload: 35729,  //声明给 watch 监听的端口
                    open: true //自动打开网页 http://
                }
            }
        },
        watch: {
            options:{
                livereload: true//watch的这个选项已经能实现实时刷新
            },
            copy: {
                files: [ 'src/**/*.{html,css,jpeg,jpg,svg,js,png,gif}'],
                tasks: [ 'newer:copy' ]
            },
            jsx: {
                files: 'src/**/*.jsx',
                tasks: [ 'newer:react' ]
            }
        }
    })
};