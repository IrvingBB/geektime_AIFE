const fs = require('fs');
const path = require('path');

// 读取 JSON 文件并返回解析后的数据
function readJsonFile(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

// 写入数据到 JSON 文件
function writeJsonFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// 处理点击数据并为每个点击分配区域类型
function assignClickCardType(clickData, regions) {
  clickData.forEach((click) => {
    const clickY = click.clickPosition.y;
    let foundRegion = null;

    for (const [regionName, [start, end]] of Object.entries(regions)) {
      if (clickY >= start && clickY <= end) {
        foundRegion = regionName;
        break;
      }
    }

    click.clickCardType = foundRegion;
  });

  return clickData;
}

// 过滤掉 clickCardType 为 null 的数据
function filterClickData(clickData) {
  return clickData.filter(click => click.clickCardType !== null);
}

// 文件路径
const inputFilePath = "./onetwo.json"; // 输入 JSON 文件路径
const outputFilePath = "./onetwowithcardtype.json"; // 输出 JSON 文件路径

// 区域数据
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
  item_38: [5230, 5330]
};

// 执行操作
const clickData = readJsonFile(inputFilePath);
const updatedClickData = assignClickCardType(clickData, regions);
const filteredClickData = filterClickData(updatedClickData);
writeJsonFile(outputFilePath, filteredClickData);

console.log('Data processing complete. Results saved to', outputFilePath);