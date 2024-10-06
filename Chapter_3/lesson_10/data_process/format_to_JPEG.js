const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const convertAndRenameImages = async (sourceFolderPath, targetFolderPath) => {
    try {
        // 读取源文件夹中的所有文件
        const files = fs.readdirSync(sourceFolderPath);

        // 过滤出JPEG和PNG文件并按文件名排序
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ext === '.jpeg' || ext === '.png';
        }).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

        // 检查目标文件夹是否存在，如果不存在则创建它
        if (!fs.existsSync(targetFolderPath)) {
            fs.mkdirSync(targetFolderPath);
        }

        // 依次处理每个JPEG和PNG文件
        for (let i = 0; i < imageFiles.length; i++) {
            const oldFilePath = path.join(sourceFolderPath, imageFiles[i]);
            const newFileName = `${i + 1}.jpeg`;
            const newFilePath = path.join(targetFolderPath, newFileName);

            // 使用sharp将文件转换为JPEG文件
            await sharp(oldFilePath)
                .jpeg()
                .toFile(newFilePath);

            console.log(`Converted and saved: ${newFileName}`);
        }

        console.log('All JPEG and PNG images have been converted and saved to the target folder in JPEG format.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

// 调用函数并传递源文件夹和目标文件夹路径
const sourceFolderPath = '';  // 将此处替换为你的源文件夹路径
const targetFolderPath = '';  // 将此处替换为你的目标文件夹路径
convertAndRenameImages(sourceFolderPath, targetFolderPath);