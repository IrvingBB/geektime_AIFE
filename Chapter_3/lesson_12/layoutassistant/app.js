const fs = require('fs')
const md5 = require('md5');
const path = require('path');
const process = require("child_process");
let preveMd5 = null;
let fsWait = false;
const filePath = path.join(__dirname, '/AILayout/');
fs.watch(filePath, (event, filename) => {
    if (filename) {
        if (fsWait) return;
        fsWait = setTimeout(() => {
            fsWait = false;
        }, 100)
        var currentMd5 = md5(fs.readFileSync(filePath + filename))
        if (currentMd5 == preveMd5) {
            // return
            console.log("same content");
        }
        preveMd5 = currentMd5
        console.log(`${filePath}${filename} updated`);
        process.exec('npm run codegen', (error, stdout, stderr) => {
            if (!error) {
                // 成功
            } else {
                // 失败
            }
        });
    }
})