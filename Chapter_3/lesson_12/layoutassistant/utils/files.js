const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,'../tempweb/src/')

const createFile = (html) => {
    fs.writeFileSync(`${filePath}app.js`,html);
}

module.exports = {
    createFile
}