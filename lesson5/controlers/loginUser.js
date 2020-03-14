const models = require('../models');

const createUserLogin = (req, res) => {
    models.User.create(req.body, (err, data) => {
        if(err) console.log(err);
        res.status(201).send(`User with id: '${data._id}' was created`).end();
    })
};

module.exports = {
    createUserLogin
};