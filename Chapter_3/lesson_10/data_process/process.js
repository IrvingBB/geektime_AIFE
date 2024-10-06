const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const augmentImage = async (imagePath, outputPath, augmentation) => {
    let image = sharp(imagePath);
    
    switch (augmentation.type) {
        case 'rotate':
            image = image.rotate(augmentation.angle);
            break;
        case 'flip':
            image = image.flip();
            break;
        case 'flop':
            image = image.flop();
            break;
        case 'brightness':
            image = image.modulate({ brightness: augmentation.value });
            break;
        case 'contrast':
            image = image.modulate({ contrast: augmentation.value });
            break;
        case 'blur':
            image = image.blur(augmentation.value);
            break;
        case 'crop':
            const metadata = await image.metadata();
            const cropWidth = Math.floor(metadata.width * augmentation.width);
            const cropHeight = Math.floor(metadata.height * augmentation.height);
            const left = Math.floor((metadata.width - cropWidth) / 2);
            const top = Math.floor((metadata.height - cropHeight) / 2);
            image = image.extract({ left: left, top: top, width: cropWidth, height: cropHeight });
            break;
    }

    await image.toFile(outputPath);
};

const augmentImages = async (sourceFolderPath, targetFolderPath) => {
    try {
        // 读取源文件夹中的所有文件
        const files = fs.readdirSync(sourceFolderPath);

        // 过滤出所有图像文件（可以是不同格式）
        const imageFiles = files.filter(file => ['.png', '.jpg', '.jpeg']
            .includes(path.extname(file).toLowerCase()));

        // 检查目标文件夹是否存在，如果不存在则创建它
        if (!fs.existsSync(targetFolderPath)) {
            fs.mkdirSync(targetFolderPath);
        }

        const augmentations = [
            { type: 'rotate', angle: 90 },
            // { type: 'rotate', angle: 180 },
            // { type: 'rotate', angle: 270 },
            { type: 'flip' },
            { type: 'flop' },
            { type: 'brightness', value: 1.5 },
            { type: 'contrast', value: 1.5 },
            { type: 'blur', value: 5 },
            { type: 'crop', width: 0.8, height: 0.8 }
        ];

        let augmentationCount = 0;

        // 每张图片应用所有增强，并保存到目标文件夹
        for (const imageFile of imageFiles) {
            const filePath = path.join(sourceFolderPath, imageFile);
            const baseName = path.basename(imageFile, path.extname(imageFile));
            const outputFilePath = path.join(targetFolderPath, `${baseName}_original${path.extname(imageFile)}`);
            fs.copyFileSync(filePath, outputFilePath);

            for (const aug of augmentations) {
                const augmentationName = `${aug.type}${aug.angle ? `_${aug.angle}` : ''}${aug.value ? `_${aug.value}` : ''}${aug.width ? `_crop${aug.width}_${aug.height}` : ''}`;
                const newFileName = `${baseName}_${augmentationName}${path.extname(imageFile)}`;
                const newFilePath = path.join(targetFolderPath, newFileName);
                await augmentImage(filePath, newFilePath, aug);
                augmentationCount++;
                if (augmentationCount >= 275) break;  // 限制生成75张增强图片以达到100张总数
            }
            if (augmentationCount >= 275) break;
        }

        console.log('All images have been augmented and saved to the target folder.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

// 调用函数并传递源文件夹和目标文件夹路径
const sourceFolderPath = '';  // 将此处替换为你的源文件夹路径
const targetFolderPath = '';  // 将此处替换为你的目标文件夹路径
augmentImages(sourceFolderPath, targetFolderPath);
