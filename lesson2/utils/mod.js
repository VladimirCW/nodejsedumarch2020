const util = require('util');

let func = function() {
    console.log("Hello");
};

let depFunc = util.deprecate(func, "asdad");


module.exports = {func: depFunc};