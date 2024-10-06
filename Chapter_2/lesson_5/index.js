const tf = require('@tensorflow/tfjs-node');
const mnist = require('mnist');

// 加载MNIST数据
const loadData = () => {
  const set = mnist.set(8000, 2000);
  const training = set.training;
  const test = set.test;

  const formatData = (data) => {
    return {
      images: tf.tensor(data.map(item => item.input)).reshape([-1, 28, 28, 1]),
      labels: tf.tensor(data.map(item => item.output))
    };
  };

  return {
    trainData: formatData(training),
    testData: formatData(test)
  };
};

// 构建LeNet模型
const buildLeNetModel = () => {
  const model = tf.sequential();

  model.add(tf.layers.conv2d({
    inputShape: [28, 28, 1],
    kernelSize: 5,
    filters: 6,
    activation: 'relu',
  }));
  model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }));

  model.add(tf.layers.conv2d({
    kernelSize: 5,
    filters: 16,
    activation: 'relu',
  }));
  model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }));

  model.add(tf.layers.flatten());

  model.add(tf.layers.dense({
    units: 120,
    activation: 'relu',
  }));
  model.add(tf.layers.dense({
    units: 84,
    activation: 'relu',
  }));
  model.add(tf.layers.dense({
    units: 10,
    activation: 'softmax',
  }));

  return model;
};

// 训练和评估模型
const run = async () => {
  const { trainData, testData } = loadData();

  const model = buildLeNetModel();
  model.compile({
    optimizer: tf.train.adam(),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  await model.fit(trainData.images, trainData.labels, {
    epochs: 10,
    validationSplit: 0.1,
  });

  const evaluation = await model.evaluate(testData.images, testData.labels);
  console.log(`Test Loss: ${evaluation[0].dataSync()}, Test Accuracy: ${evaluation[1].dataSync()}`);
};

run().catch(console.error);