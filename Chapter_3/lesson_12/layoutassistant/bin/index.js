const { pageLayout } = require("../AILayout/layout");
const { codeGen } = require("../utils/codeGenarator");
const { createFile } = require("../utils/files");

createFile(codeGen(pageLayout));