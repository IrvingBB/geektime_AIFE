// 生成随机用户ID
function generateUserIds(numUsers) {
    const userIds = [];
    for (let i = 0; i < numUsers; i++) {
        userIds.push(`user_${i + 1}`);
    }
    return userIds;
}

// 生成随机性别
function generateRandomGender() {
    const genders = ['male', 'female'];
    return genders[Math.floor(Math.random() * genders.length)];
}

// 生成随机年龄
function generateRandomAge() {
    return Math.floor(Math.random() * (55 - 18 + 1)) + 18;
}

// 生成随机点击时间
function generateRandomTime() {
    const date = new Date();
    date.setHours(Math.floor(Math.random() * 24));
    date.setMinutes(Math.floor(Math.random() * 60));
    date.setSeconds(Math.floor(Math.random() * 60));
    return date.toISOString();
}

// 生成随机点云
function generateRandomPointCloud(numPoints, maxX, maxY) {
    const points = [];
    for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        points.push({ x, y });
    }
    return points;
}

// 在指定坐标附近生成热点区域
function generateHotspotsNearCoordinate(centerX, centerY, numHotspots, maxOffset = 100) {
    const hotspots = [];
    for (let i = 0; i < numHotspots; i++) {
        const pointCloud = generateRandomPointCloud(10, maxOffset * 2, maxOffset * 2).map(point => ({
            x: centerX + point.x - maxOffset,
            y: centerY + point.y - maxOffset
        }));
        hotspots.push(pointCloud);
    }
    return hotspots;
}

// 修改后的生成热点区域函数，热点区域在y = 0到800px范围内生成
function generateHotspots(numHotspots, pageWidth) {
    const hotspots = [];
    for (let i = 0; i < numHotspots; i++) {
        const maxY = 800; // 设置热点区域的最大Y坐标为800px
        const centerX = Math.floor(Math.random() * pageWidth);
        const centerY = Math.floor(Math.random() * maxY); // 限制中心Y坐标到前800px内
        const pointCloud = generateRandomPointCloud(10, 100, 100).map(point => ({
            x: centerX + point.x - 50,
            y: centerY + point.y - 50
        }));
        hotspots.push(pointCloud);
    }
    return hotspots;
}

// 检查点是否在多边形内
function isPointInPolygon(point, polygon) {
    let x = point.x, y = point.y;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x, yi = polygon[i].y;
        const xj = polygon[j].x, yj = polygon[j].y;

        const intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

// 生成随机点击位置，模拟热点和冷点区域，并在x轴上点击数据逐渐减少
function generateRandomClickPosition(hotspots, pageWidth) {
    let x, y;
    const decreaseRate = 0.5; // 调整这里的值来控制减少的速率，越小减少越慢
    if (Math.random() < 0.7) { // 70%的概率生成在热点区域
        const hotspot = hotspots[Math.floor(Math.random() * hotspots.length)];
        do {
            x = Math.floor(Math.random() * pageWidth);
            y = Math.floor(Math.random() * 5000);
        } while (!isPointInPolygon({ x, y }, hotspot) || Math.random() > ((pageWidth - x) / pageWidth) ** decreaseRate);
    } else { // 30%的概率生成在其他区域
        do {
            x = Math.floor(Math.random() * pageWidth);
            y = Math.floor(Math.random() * 5000);
        } while (Math.random() > (5000 - y) / 5000 || Math.random() > ((pageWidth - x) / pageWidth) ** decreaseRate);
    }
    return { x, y };
}

// 生成点击数据
function generateClickData(userIds, clicksPerUser, hotspots, pageWidth) {
    const clickData = [];
    userIds.forEach(userId => {
        const gender = generateRandomGender();
        const age = generateRandomAge();
        for (let i = 0; i < clicksPerUser; i++) {
            clickData.push({
                userId: userId,
                gender: gender,
                age: age,
                clickTime: generateRandomTime(),
                clickPosition: generateRandomClickPosition(hotspots, pageWidth)
            });
        }
    });
    return clickData;
}
const numUsers = 10000;
const clicksPerUser = 5; // 每个用户的点击次数
const numHotspots = 6; // 热点区域数量
const pageWidth = 390;

const userIds = generateUserIds(numUsers);
const hotspots = generateHotspots(numHotspots, pageWidth);
generateClickData(userIds, clicksPerUser, hotspots, pageWidth)
