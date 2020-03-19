const assert = require('assert');
const helper = require('../../../helpers/passwordHelper');
const crypto = require('crypto');

describe('Password helper', function() {
    describe('Compare passwords', function() {
        describe('When password is correct', function() {
            it('should return true', function() {
                const passwordRaw = "456789";
                const passwordHash = crypto.createHmac('sha256', passwordRaw).digest('hex');
                const expected = true;
                const actual = helper.comparePasswords(passwordRaw, passwordHash);
                assert.equal(expected, actual);
            });
        });
        describe('When password is incorrect', function() {
            it('should return false', function() {
                const passwordRaw = "456789";
                const passwordHash = crypto.createHmac('sha256', passwordRaw).digest('hex');
                const expected = false;
                const actual = helper.comparePasswords(passwordRaw + passwordRaw, passwordHash);
                assert.equal(expected, actual);
            });
        });
    });
});