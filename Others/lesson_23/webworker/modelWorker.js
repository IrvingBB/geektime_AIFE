importScripts('./tf.js'); // 引入 TensorFlow.js 库

let model;

// 监听主线程消息（接收输入数据）
self.onmessage = async function (event) {
  const inputData = event.data.input;

  if (!model) {
    try {
      // 加载模型
      model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Error loading model:', error);
      return;
    }
  }

  // 将输入数据重构为正确形状的 Tensor
  const inputTensor = tf.tensor(inputData, [1, 224, 224, 3]); // 指定形状
  const prediction = model.predict(inputTensor);

  // 将结果转为数组并返回主线程
  const result = await prediction.array();
  self.postMessage(result);
};
