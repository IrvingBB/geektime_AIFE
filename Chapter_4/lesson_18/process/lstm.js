const fs = require('fs');
const synaptic = require('synaptic');

// 读取 JSON 文件中的数据
const rawData = fs.readFileSync('../data/onetwowithcardtype.json', 'utf-8');
const data = JSON.parse(rawData);

// 将数据转换为适合网络的输入格式
const processedData = data.map(item => ({
    gender: item.gender === 'male' ? 0 : 1,
    age: item.age,
    clickTime: new Date(item.clickTime).getTime(),
    clickPositionX: item.clickPosition.x,
    clickPositionY: item.clickPosition.y,
    clickCardType: item.clickCardType
}));

// 提取输入特征
const inputFeatures = processedData.map(item => [
    item.gender, 
    item.age, 
    item.clickTime, 
    item.clickPositionX, 
    item.clickPositionY
]);

// 提取标签 (clickCardType) 并将其转化为数值（假设有三个类型）
const cardTypes = Array.from(new Set(processedData.map(item => item.clickCardType)));
const labelMap = cardTypes.reduce((map, type, index) => (map[type] = index, map), {});
const labels = processedData.map(item => labelMap[item.clickCardType]);

// 为神经网络准备训练数据
const trainingData = inputFeatures.map((input, index) => ({
    input: input,
    output: Array(cardTypes.length).fill(0).map((v, i) => i === labels[index] ? 1 : 0)
}));

// 创建并训练神经网络
const { Layer, Network } = synaptic;
const inputLayer = new Layer(5);
const hiddenLayer = new Layer(10);
const outputLayer = new Layer(cardTypes.length);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

const net = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
});

const trainer = new synaptic.Trainer(net);
trainer.train(trainingData, {
    rate: 0.1,
    iterations: 100,
    error: 0.01,
    shuffle: true,
    log: 10
});

// 保存模型
const modelJSON = net.toJSON();
fs.writeFileSync('./model.json', JSON.stringify(modelJSON));

console.log('Model trained and saved successfully.');

// 使用模型进行预测
const newUserData = [
    0, // gender: male
    25, // age
    new Date().getTime(), // current time
    150, // clickPositionX
    300  // clickPositionY
];

// 预测结果
const output = net.activate(newUserData);
const predictedIndex = output.indexOf(Math.max(...output));
const predictedLabel = cardTypes[predictedIndex];
console.log('Predicted ClickCardType:', predictedLabel);
