const fs = require('fs');
const math = require('mathjs');

// 读取数据
const data = JSON.parse(fs.readFileSync('../data/onetwowithcardtype.json', 'utf-8'));

// 定义所有的 clickCardType 区域
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
  item_36: [4790, 4890]
};

// 将性别和年龄转换为数值
const numericData = data.map(({ gender, age, clickCardType }) => ({
  gender: gender === 'male' ? 0 : 1,
  age,
  ...Object.keys(regions).reduce((acc, key) => {
    acc[key] = clickCardType === key ? 1 : 0;
    return acc;
  }, {})
}));

// 计算皮尔逊相关系数
const pearsonCorrelation = (x, y) => {
  const meanX = math.mean(x);
  const meanY = math.mean(y);
  const numerator = math.sum(x.map((xi, i) => (xi - meanX) * (y[i] - meanY)));
  const denominator = Math.sqrt(
    math.sum(x.map(xi => (xi - meanX) ** 2)) * math.sum(y.map(yi => (yi - meanY) ** 2))
  );
  return numerator / denominator;
};

// 计算年龄和性别与每个 clickCardType 的相关性
const clickCardTypes = Object.keys(regions);
const correlations = clickCardTypes.reduce((acc, type) => {
  acc[type] = {
    ageCorrelation: pearsonCorrelation(
      numericData.map(d => d.age),
      numericData.map(d => d[type])
    ),
    genderCorrelation: pearsonCorrelation(
      numericData.map(d => d.gender),
      numericData.map(d => d[type])
    )
  };
  return acc;
}, {});

// 打印相关性结果
clickCardTypes.forEach(type => {
  console.log(`Age-Click Correlation with ${type}:`, correlations[type].ageCorrelation);
  console.log(`Gender-Click Correlation with ${type}:`, correlations[type].genderCorrelation);
});