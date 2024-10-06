const synaptic = require('synaptic');
const fs = require('fs');

// 读取 JSON 文件中的数据
const rawData = fs.readFileSync('../data/oneonewithcardtype.json', 'utf-8');
const data = JSON.parse(rawData);

// 卡片类型映射
const cardTypes = [
  'bar', 'seckill', 'item_1', 'banner', 'item_2', 'item_3', 'item_4', 'item_5',
  'item_6', 'item_7', 'item_8', 'item_9', 'item_10', 'item_11', 'item_12', 'item_13',
  'item_14', 'item_15', 'item_16', 'item_17', 'item_18', 'item_19', 'item_20', 'item_21',
  'item_22', 'item_23', 'item_24', 'item_25', 'item_26', 'item_27', 'item_28', 'item_29',
  'item_30', 'item_31', 'item_32', 'item_33', 'item_34', 'item_35', 'item_36', 'item_37',
  'item_38'
];

// 数据预处理
const preprocessData = (data) => {
  return data.map(item => {
    const gender = item.gender === 'male' ? 0 : 1;
    const output = cardTypes.map(type => type === item.clickCardType ? 1 : 0);
    return {
      input: [item.age, gender], // 注意这里应该是 'input' 而不是 'inputs'
      output: output // 独热编码的输出
    };
  });
};

const processedData = preprocessData(data);

// 检查预处理后的数据
console.log('Processed Data Sample:', processedData[0]);

// 定义一个简单的神经网络模型
const { Layer, Network } = synaptic;

// 创建网络层
const inputLayer = new Layer(2); // 输入层：特征数（年龄和性别）
const hiddenLayer = new Layer(10); // 隐藏层的神经元数量
const outputLayer = new Layer(cardTypes.length); // 输出层：预测类别数量

// 连接网络层
inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

// 创建网络
const network = new Network({
  input: inputLayer,
  hidden: [hiddenLayer],
  output: outputLayer
});

// 训练网络
const trainer = new synaptic.Trainer(network);
trainer.train(processedData, {
  rate: 0.01,
  iterations: 20,
  error: 0.01,
  shuffle: true // 随机化训练数据，确保训练效果
});

// 预测
const predict = (inputData) => {
  // 检查输入数据
  console.log('Prediction Input:', inputData);
  const output = network.activate(inputData);
  console.log('Raw Network Output:', output);
  return cardTypes[output.indexOf(Math.max(...output))]; // 返回预测类别
};

// 示例预测
const prediction = predict([48, 0]); // 48岁男性的输入特征
console.log('Prediction:', prediction);
