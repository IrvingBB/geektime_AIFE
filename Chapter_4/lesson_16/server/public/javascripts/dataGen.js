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
    return Math.floor(Math.random() * (55 - 18 + 1)) + 18; // 年龄在18到55之间
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

// 生成热点区域，随着y增加，热点区域减少
function generateHotspots(numHotspots, pageWidth) {
    const hotspots = [];
    for (let i = 0; i < numHotspots; i++) {
        // 使热点区域更多地集中在页面上方
        const maxY = 5000 / (i + 1); // 随着热点的数量增加，y的最大值变小
        const centerX = Math.floor(Math.random() * pageWidth); // 使用网页宽度
        const centerY = Math.floor(Math.random() * maxY);
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

// 生成随机点击位置，模拟热点和冷点区域
function generateRandomClickPosition(hotspots, pageWidth) {
    let x, y;
    if (Math.random() < 0.7) { // 70%的概率生成在热点区域
        const hotspot = hotspots[Math.floor(Math.random() * hotspots.length)];
        do {
            x = Math.floor(Math.random() * pageWidth); // 使用网页宽度
            y = Math.floor(Math.random() * 5000);
        } while (!isPointInPolygon({ x, y }, hotspot));
    } else { // 30%的概率生成在其他区域
        x = Math.floor(Math.random() * pageWidth); // 使用网页宽度
        do {
            y = Math.floor(Math.random() * 5000);
        } while (Math.random() > (5000 - y) / 5000); // y越大，生成点击的概率越小
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

// 保存数据到文件
function saveDataToFile(data, fileName) {
    const filePath = path.join(__dirname, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${filePath}`);
}

// 主函数
function main() {
    const numUsers = 10000;
    const clicksPerUser = 3; // 每个用户的点击次数
    const numHotspots = 10; // 热点区域数量
    const pageWidth = 390; // 这里假设网页宽度是1280，可以根据需要修改

    const userIds = generateUserIds(numUsers);
    const hotspots = generateHotspots(numHotspots, pageWidth);

    // 在指定坐标附近生成热点区域
    // const additionalHotspots = generateHotspotsNearCoordinate(200, 2000, 5, 100);
    // hotspots.push(...additionalHotspots);

    const clickData = generateClickData(userIds, clicksPerUser, hotspots, pageWidth);
    saveDataToFile(clickData, '../server/public/data/click_data.json');
}