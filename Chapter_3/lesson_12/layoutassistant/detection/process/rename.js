"use strict";

const fs = require('fs')
fs.rename('logs/hello.log','logs/hola.log',(error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('ok');
  }
});