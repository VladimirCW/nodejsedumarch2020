const emitter = require("./emitter").emitter;
require('./mod');

emitter.emit('read', "someData", "2", "3");

console.log(emitter.getMaxListeners());