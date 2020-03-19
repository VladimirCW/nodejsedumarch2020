const request = require('supertest');
const app = require('../../../server');
const expect = require('chai').expect;

describe('/login POST', function() {
    let response;
    describe('When credentials are correct', function() {
        before(function(done) {
            request(app)
                .post('/login')
                .send({
                    "name": "Vova",
                    "password": "456"
                })
                .end(function(err, res) {
                    if (err) throw err;
                    response = res;
                    done();
                });
        });
        it('should return status code 200', function() {
            expect(response.status).to.equal(200);
        });
        it('should return body with key "token"', function() {
            expect(Object.keys(response.body)).to.include.members(['token']);
        });
        it('should return token value separated by comma', function() {
            expect(response.body.token.split('.').length).to.equal(3);
        });
    });

    describe('When credentials are not correct', function() {
        before(function(done) {
            request(app)
                .post('/login')
                .send({
                    "name": "Vova",
                    "password": "45s6"
                })
                .end(function(err, res) {
                    if (err) throw err;
                    response = res;
                    done();
                });
        });
        it('should return status code 401', function() {
            expect(response.status).to.equal(401);
        });
        it('should return body with key "message"', function() {
            expect(Object.keys(response.body)).to.include.members(['message']);
        });
        it('should return token value separated by comma', function() {
            expect(Object.keys(response.body)).to.not.include.members(['token']);
        });
    });
});