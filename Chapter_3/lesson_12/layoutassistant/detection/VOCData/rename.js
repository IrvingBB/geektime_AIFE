const fs = require('fs');
const path = require('path');

function renameFilesInDirectory(directory) {
    // 读取目录中的文件
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('无法读取目录:', err);
            return;
        }

        // 遍历目录中的每个文件
        files.forEach(file => {
            const filePath = path.join(directory, file);

            // 检查文件是否是 .jpeg 结尾
            if (path.extname(file).toLowerCase() === '.jpeg') {
                const newFilePath = path.join(directory, path.basename(file, '.jpeg') + '.jpg');

                // 重命名文件
                fs.rename(filePath, newFilePath, err => {
                    if (err) {
                        console.error(`无法重命名文件 ${filePath}:`, err);
                    } else {
                        console.log(`文件 ${filePath} 已重命名为 ${newFilePath}`);
                    }
                });
            }
        });
    });
}

// 使用示例
const directoryPath = './images'; // 替换为你的目录路径
renameFilesInDirectory(directoryPath);
