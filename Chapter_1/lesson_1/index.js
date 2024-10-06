const fs = require('fs');
const path = require('path');
const md5 = require('md5');


// 使用 fs.watchFile 监听文件变化
fs.watchFile(filePath, { interval: 1000 }, (curr, prev) => {
    // 检查文件的修改时间是否发生了变化  
    if (curr.mtime !== prev.mtime) {
        console.log('文件已修改');
        // 读取文件内容  
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('读取文件时发生错误:', err);
                return;
            }
            console.log('文件新内容:', data);
        });
    }
}); 

// 使用 fs.watch 监听文件变化  
fs.watch(filePath, (eventType, filename) => {  
    if (eventType === 'change') {  
        console.log('文件已更改:', filename);  
        // 读取文件内容  
        fs.readFile(filePath, 'utf8', (err, data) => {  
            if (err) {  
                console.error('读取文件时发生错误:', err);  
                return;  
            }  
            console.log('文件新内容:', data);  
        });  
    }  
});


// 使用MD5值对比文件内容是否发生变化
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
            return
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