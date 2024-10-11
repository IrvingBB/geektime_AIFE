const fs = require('fs');
const path = require('path');

// xml文件的路径
const xmlfilepath = './Annotations/';
// 生成的txt文件的保存路径
const saveBasePath = './ImageSets/';

// 训练验证集占整个数据集的比重（划分训练集和测试验证集）
const trainvalPercent = 0.9;
// 训练集占整个训练验证集的比重（划分训练集和验证集）
const trainPercent = 0.8;

// 获取xml文件列表
const totalXml = fs.readdirSync(xmlfilepath);
const num = totalXml.length;
const list = Array.from({ length: num }, (_, i) => i);

const tv = Math.floor(num * trainvalPercent);
const tr = Math.floor(tv * trainPercent);

// 随机抽样
const trainval = list.sort(() => 0.5 - Math.random()).slice(0, tv);
const train = trainval.sort(() => 0.5 - Math.random()).slice(0, tr);

console.log("train and val size", tv);
console.log("train size", tr);

// 创建文件写入流
const ftrainval = fs.createWriteStream(path.join(saveBasePath, 'Main/trainval.txt'));
const ftest = fs.createWriteStream(path.join(saveBasePath, 'Main/test.txt'));
const ftrain = fs.createWriteStream(path.join(saveBasePath, 'Main/train.txt'));
const fval = fs.createWriteStream(path.join(saveBasePath, 'Main/val.txt'));

// 写入数据
list.forEach(i => {
    const name = totalXml[i].slice(0, -4) + '\n';
    if (trainval.includes(i)) {
        ftrainval.write(name);
        if (train.includes(i)) {
            ftrain.write(name);
        } else {
            fval.write(name);
        }
    } else {
        ftest.write(name);
    }
});

// 关闭文件写入流
ftrainval.end();
ftrain.end();
fval.end();
ftest.end();