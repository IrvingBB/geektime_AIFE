const DecisionTree = require('decision-tree');
const fs = require('fs');

// 读取 JSON 文件中的数据
const rawData = fs.readFileSync('../data/onetwowithcardtype.json', 'utf-8');
const data = JSON.parse(rawData);

// 准备训练数据
const trainingData = data.map(({ gender, age, clickCardType }) => ({
  gender: gender === 'male' ? 0 : 1,  // 将性别转换为数值
  age,
  clickCardType
}));

// 过滤无效的标签并确保标签是有效的类
const validTrainingData = trainingData.filter(item => 
  item.clickCardType !== undefined && 
  item.clickCardType !== null &&
  item.clickCardType !== '' // 检查空字符串
);

if (validTrainingData.length === 0) {
  throw new Error('No valid training data available.');
}

// 特征和标签
const features = ['gender', 'age'];
const labels = validTrainingData.map(item => item.clickCardType);

// 创建并训练决策树
const decisionTree = new DecisionTree(validTrainingData, 'clickCardType', features);

// 预测
const predictedLabel = decisionTree.predict({ gender: 0, age: 25 }); // 预测25岁男性用户的点击行为
console.log('Predicted label:', predictedLabel);

