#!/usr/bin/env node
var shell = require("shelljs");
var readline = require('readline'),
  rl = readline.createInterface(process.stdin, process.stdout);
const [,, ...args] = process.argv;
const former = [
  "build and prepare for set version (yes or no) ? ","set commit message: ","set new virsion: v"
];
let counter = 0;
const pjson = require('./package.json');
console.log(`current version is: v${pjson.version}`);
const q1 = () =>{
  if(counter > former.length - 1){
    rl.close();
    return true;
  }
  rl.question(former[counter], (input) => {
    switch(counter){
      case 0:
        if(input === 'no') return rl.close();
        console.log(`npm run build && git add -A .`);
        shell.exec(`npm run build && git add -A .`);
        console.log(`done!`);
        break;
        case 1:
          console.log(`git commit -m '${input}'`);
          shell.exec(`git commit -m '${input}'`);
          console.log(`done!`);
        break;
      case 2:
        
        shell.exec(`npm version ${input}`);
        if(input === pjson.version) {
          counter--
        }else{
          console.log(`done!`);
          console.log(`please type 'npm run publisher'`);
        }

        break;
    }
    counter++;
    q1();
  });
}
q1();