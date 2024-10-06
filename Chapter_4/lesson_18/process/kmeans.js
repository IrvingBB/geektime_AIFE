const fs = require('fs');
const kmeans = require('node-kmeans');

// 读取 JSON 文件中的数据
const data = JSON.parse(fs.readFileSync('../data/onetwowithcardtype.json', 'utf-8'));

// 定义卡片类型区域
const regions = {
  bar: [0, 100],
  seckill: [150, 350],
  item_1: [370, 470],
  banner: [490, 590],
  item_2: [610, 710],
  item_3: [830, 930],
  item_4: [950, 1050],
  item_5: [1070, 1170],
  item_6: [1190, 1290],
  item_7: [1310, 1410],
  item_8: [1430, 1530],
  item_9: [1550, 1650],
  item_10: [1670, 1770],
  item_11: [1790, 1890],
  item_12: [1910, 2010],
  item_13: [2030, 2130],
  item_14: [2150, 2250],
  item_15: [2270, 2370],
  item_16: [2390, 2490],
  item_17: [2510, 2610],
  item_18: [2630, 2730],
  item_19: [2750, 2850],
  item_20: [2870, 2970],
  item_21: [2990, 3090],
  item_22: [3110, 3210],
  item_23: [3230, 3330],
  item_24: [3350, 3450],
  item_25: [3470, 3570],
  item_26: [3590, 3690],
  item_27: [3710, 3810],
  item_28: [3830, 3930],
  item_29: [3950, 4050],
  item_30: [4070, 4170],
  item_31: [4190, 4290],
  item_32: [4310, 4410],
  item_33: [4430, 4530],
  item_34: [4550, 4650],
  item_35: [4670, 4770],
  item_36: [4790, 4890],
  item_37: [5010, 5110],
  item_38: [5230, 5330],
};

// 将卡片类型映射到数值
const cardTypeToNumber = (cardType) => {
  return Object.keys(regions).indexOf(cardType);
};

// 将性别和年龄映射到数值
const genderToNumber = (gender) => (gender === 'male' ? 0 : 1);

const ageToNumber = (age) => {
  if (age >= 18 && age <= 25) return 0;
  if (age >= 26 && age <= 35) return 1;
  if (age >= 36 && age <= 45) return 2;
  if (age >= 46 && age <= 55) return 3;
  return 4; // 超过范围的年龄
};

// 转换数据格式以便进行聚类
const vectors = data.map((entry) => [
  genderToNumber(entry.gender),
  ageToNumber(entry.age),
  cardTypeToNumber(entry.clickCardType),
]);

// 设置聚类的数量
const numClusters = 3; // 可以调整聚类数量

// 执行 K-means 聚类
kmeans.clusterize(vectors, { k: numClusters }, (err, res) => {
  if (err) {
    console.error('K-means 聚类出错:', err);
  } else {
    console.log('K-means 聚类结果:');
    
    res.forEach((cluster, index) => {
      const userIds = cluster.clusterInd.map(pointIndex => data[pointIndex].userId);
      const uniqueUserIds = [...new Set(userIds)]; // 去重用户ID数组
      
      console.log(`\n聚类 ${index + 1}：`);
      console.log(`质心：`, cluster.centroid);
      console.log(`用户ID数组：`, uniqueUserIds);
    });
  }
});