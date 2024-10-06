const Jimp = require('jimp');

const flipImage = (input, output, horizontal, vertical) => {
    Jimp.read(input)
        .then(image => {
            image.mirror(horizontal, vertical);
            image.write(output);
        })
        .catch(err => {
            console.error(err);
        });
}

const scaleImage = (input, output, scale) => {
    Jimp.read(input)
        .then(image => {
            image.scale(scale);
            image.write(output);
        })
        .catch(err => {
            console.error(err);
        });
}

const brightnessImage = (input, output, brightness) => {
    Jimp.read(input)
        .then(image => {
            image.brightness(brightness);
            image.write(output);
        })
        .catch(err => {
            console.error(err);
        });
}

const darkenImage = (input, output, darken) => {
    Jimp.read(input)
        .then(image => {
            image.darken(darken);
            image.write(output);
        })
        .catch(err => {
            console.error(err);
        });
}

const cropImage = (input, output, x, y, w, h) => {
    Jimp.read(input)
        .then(image => {
            image.crop(x, y, w, h);
            image.write(output);
        })
        .catch(err => {
            console.error(err);
        });
}

const rotateImage = (input, output, deg) => {
    Jimp.read(input)
        .then(image => {
            image.rotate(deg);
            image.write(output);
        })
        .catch(err => {
            console.error(err);
        });
}

const blurImage = (input, output, r) => {
    Jimp.read(input)
        .then(image => {
            image.blur(r);
            image.write(output);
        })
        .catch(err => {
            console.error(err);
        });
}

const noiseImage = (input, output, amount) => {
    Jimp.read(input)
        .then(image => {
            image.noise(amount);
            image.write(output);
        })
        .catch(err => {
            console.error(err);
        });
}

module.exports = {
    flipImage,
    scaleImage,
    brightnessImage,
    cropImage,
    rotateImage,
    blurImage,
    noiseImage,
    darkenImage
}