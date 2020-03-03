// console.log(process.env);
// console.log(process.cwd());

console.log(process.argv);
console.log("Hello " + process.argv[2]);

const util = require('util');
console.log(util.format("Some value %s !!", "AAAA"));