// CPU 执行矩阵乘法
function cpuMultiply(a, b) {
    const size = 512;
    const result = Array(size).fill().map(() => Array(size).fill(0));
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let sum = 0;
            for (let k = 0; k < size; k++) {
                sum += a[i][k] * b[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

// GPU 执行矩阵乘法
function gpuMultiply(matrixA, matrixB) {
    const gpu = new GPU.GPU();
    const multiplyKernel = gpu.createKernel(function (a, b) {
        let sum = 0;
        for (let k = 0; k < this.constants.size; k++) {
            sum += a[this.thread.y][k] * b[k][this.thread.x];
        }
        return sum;
    })
        .setOutput([512, 512]) // 输出维度
        .setConstants({ size: 512 }); // 矩阵的大小

    return multiplyKernel(matrixA, matrixB);
}

async function runMatrixMultiplication() {
    const size = 512;
    const matrixA = Array(size).fill().map(() => Array(size).fill(Math.random()));
    const matrixB = Array(size).fill().map(() => Array(size).fill(Math.random()));

    // 测试 CPU 执行时间
    const cpuStart = performance.now();
    cpuMultiply(matrixA, matrixB);
    const cpuTime = performance.now() - cpuStart;

    // 测试 GPU 执行时间
    const gpuStart = performance.now();
    gpuMultiply(matrixA, matrixB);
    const gpuTime = performance.now() - gpuStart;

    // 显示总执行时间
    document.getElementById('output').innerHTML = `
                <h2>总执行时间</h2>
                <p>CPU 矩阵乘法时间: ${cpuTime.toFixed(2)} ms</p>
                <p>GPU 矩阵乘法时间: ${gpuTime.toFixed(2)} ms</p>
            `;
}