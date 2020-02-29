const evn = require('events');
const emitter = new evn.EventEmitter();
const testFunc = function(data) {
    console.log("The data is" + data);
};
emitter.on("read", () => {
    console.log("I am reading 1");
});
emitter.on("read", () => {
    console.log("I am reading 2");
});

emitter.once("read", function () {
    console.log("Hello once ");
});
emitter.prependListener("read", function() {
    console.log("Prepended");
});




module.exports = {emitter};