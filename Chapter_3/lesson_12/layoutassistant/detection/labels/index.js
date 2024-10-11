const sharp = require('sharp')

for (let i = 1; i <= 16; i++) {
    const img_name = `./origin/${i}.jpg`;
    const rotate_img_name = `./tty/${80 + i}.jpg`;
    // sharp(img_name)     // 以 X轴 为旋转轴
    //     .flip(true)
    //     .toFile(rotate_img_name, err => {
    //         if (err) console.log(err)
    //     })

    // sharp(img_name)     // 以 Y轴 为旋转轴
    //     .flop(true)
    //     .toFile(rotate_img_name, err => {
    //         if (err) console.log(err)
    //     })

    // sharp(img_name)
    // .convolve({
    //     width: 3,
    //     height: 3,
    //     kernel: [-1, 0, 1, -2, 0, 2, -1, 0, 1]  // 索伯尔滤波
    // })
    // .toFile(rotate_img_name, err => {
    //     if (err) console.log(err)
    // })

    sharp(img_name)
    .rotate(180)
    .toFile(rotate_img_name, err => {
        if (err) console.log(err)
    })


}