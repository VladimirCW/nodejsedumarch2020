const os = require('os');
const path = require('path');


const delimiter = os.platform() === 'win32' ?  '\\' : '/';
const delimiter2 = path.sep;
console.log(path.parse(__filename));