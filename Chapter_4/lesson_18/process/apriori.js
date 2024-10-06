const fs = require('fs');
const { Apriori } = require('node-apriori');

// 读取 JSON 文件中的数据
const data = JSON.parse(fs.readFileSync('../data/onetwowithcardtype.json', 'utf-8'));

// 转换数据格式：将每个用户的点击行为转化为一个事务
const transactions = data.map((entry) => {
    return [
        `userId_${entry.userId}`,
        `gender_${entry.gender}`,
        `age_${entry.age}`,
        `clickCardType_${entry.clickCardType}`
    ];
});

// 设置支持度阈值和置信度阈值
const support = 0.1;

// 创建 Apriori 实例
const apriori = new Apriori(support);

// 运行 Apriori 算法
apriori.exec(transactions)
    .then(result => {
        console.log(`频繁项集：`, result.itemsets);

        // 计算关联规则
        const itemsets = result.itemsets;
        const rules = generateAssociationRules(itemsets, transactions, support);

        console.log(`关联规则：`, rules);
    })
    .catch(error => console.error('Apriori 执行出错:', error));

// 生成关联规则的函数
function generateAssociationRules(itemsets, transactions, minSupport) {
    const rules = [];

    itemsets.forEach(itemset => {
        if (itemset.items.length < 2) return;

        const subsets = getSubsets(itemset.items);

        subsets.forEach(subset => {
            const itemsetSubset = itemset.items.filter(item => !subset.includes(item));
            if (itemsetSubset.length === 0) return;

            const subsetSupport = getSupport(subset, transactions);
            const itemsetSupport = itemset.support;
            const confidence = itemsetSupport / subsetSupport;

            if (confidence >= minSupport) {
                rules.push({
                    antecedent: subset,
                    consequent: itemsetSubset,
                    support: itemsetSupport / transactions.length,
                    confidence: confidence
                });
            }
        });
    });

    return rules;
}

function getSubsets(items) {
    const subsets = [];
    const length = items.length;

    for (let i = 1; i < (1 << length); i++) {
        const subset = [];
        for (let j = 0; j < length; j++) {
            if (i & (1 << j)) {
                subset.push(items[j]);
            }
        }
        subsets.push(subset);
    }

    return subsets;
}

function getSupport(itemset, transactions) {
    let count = 0;
    transactions.forEach(transaction => {
        if (itemset.every(item => transaction.includes(item))) {
            count++;
        }
    });
    return count;
}