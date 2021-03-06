/**
 * Created by king on 15-4-27.
 *
 * ch08.fs_mkdir.js
 */
console.info("------   fs mkdir()   ------");
console.info();
var fs = require('fs'); // TODO: 引入文件系统模块
var mkdir = 'dir/mkdir';   // TODO: 定义目录
var spawn = require('child_process').spawn; // TODO: 引入child_process模块
/**
 * 创建目录（异步方法）
 */
fs.mkdir(mkdir, 0777, function (err) {
    if (err) {
        console.log(err);
        console.info();
    } else {
        console.log("fs.mkdir() done!");
        console.info();
        var ls_dir_mkdir = spawn('ls', ['-lh', 'dir']);  // TODO: 定义命令行‘ls -lh /dir’
        /**
         * 捕获控制台输出对象stdout,输出捕获数据
         */
        ls_dir_mkdir.stdout.on('data', function (data) {
            console.info('ls -lh /dir stdout:');
            console.log('stdout: ' + data);
            console.info();
            fs.rmdir(mkdir, function (err) {
                if (err) {
                    console.log(err);
                    console.info();
                } else {
                    console.log("fs.rmdir() done!");
                    console.info();
                    var ls_dir_rmdir = spawn('ls', ['-lh', 'dir']);  // TODO: 定义命令行‘ls -lh /dir’
                    /**
                     * 捕获控制台输出对象stdout,输出捕获数据
                     */
                    ls_dir_rmdir.stdout.on('data', function (data) {
                        console.info('ls -lh /dir stdout:');
                        console.log('stdout: ' + data);
                        console.info();
                    });
                    /**
                     * 绑定系统‘error’事件
                     */
                    ls_dir_rmdir.on('error', function (code) {
                        console.log('child process error with code ' + code);
                        console.info();
                    });
                    /**
                     * 绑定系统‘close’事件
                     */
                    ls_dir_rmdir.on('close', function (code) {
                        console.log('child process closed with code ' + code);
                        console.info();
                    });
                }
            });
        });
        /**
         * 绑定系统‘error’事件
         */
        ls_dir_mkdir.on('error', function (code) {
            console.log('child process error with code ' + code);
            console.info();
        });
        /**
         * 绑定系统‘close’事件
         */
        ls_dir_mkdir.on('close', function (code) {
            console.log('child process closed with code ' + code);
            console.info();
        });
    }
});
console.info();