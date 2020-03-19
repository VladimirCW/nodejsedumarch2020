const crypto = require('crypto');

const encryptPassw = (passw) => {
    return crypto.createHmac('sha256', passw).digest('hex');
};

const comparePasswords = (passw, hash) => {
    return crypto.createHmac('sha256', passw).digest('hex') === hash;
};


module.exports = {
    encryptPassw,
    comparePasswords
};