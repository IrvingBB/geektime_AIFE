const { flipImage, scaleImage, brightnessImage,cropImage, blurImage, rotateImage, noiseImage, darkenImage } = require("./process.js");
// scaleImage("0.jpg", "output_scaled.jpg", 0.5);
// brightnessImage("0.jpg", "output_bright.jpg", 0.5);
// cropImage("0.jpg", "output_cropped.jpg", 100, 100, 200, 200);
// blurImage("0.jpg", "output_blurred.jpg", 10);
// rotateImage("0.jpg", "output_rotated.jpg", 90);
// noiseImage("0.jpg", "output_noised.jpg", 0.5);
// darkenImage("0.jpg", "output_darkened.jpg", 0.5);
const originalWidth = 1200;
const originalHeight = 2670;
const newWidth = originalWidth * 8/10;
const newHeight = originalHeight;
const x = 0;
const y = 0;
cropImage("12.jpg", "output_cropped.jpg", x, y, newWidth, newHeight);
