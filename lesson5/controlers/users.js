const models = require('../models');

const findUser = (req, res) => {
    models.User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
        (err, data) => {
            if (err) console.log(err);
            res.send(`User with id: '${data._id}' and with name: "${data.name}" was updated`).end();
        });
};

const deleteUser = (req, res) => {
    models.User.findOneAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) console.log(err);
        res.send(`User with id: '${data._id}' was deleted`).end();
    });
};

const getUser = (req, res) => {
    models.User.find({ _id: req.params.id }, (err, data) => {
        if (err) console.log(err);
        res.status(200).json(data);
    });
};

const createUser = (req, res) => {
    models.User.create(req.body, (err, data) => {
        if(err) console.log(err);
        res.send(`User with id: '${data._id}' was created`).end();
    });
};

const getAllUsers = (req, res) => {
    models.User.find({}, (err, data) => {
        if (err) console.log(err);
        res.status(200).json(data);
    });
};
module.exports = {
    findUser,
    deleteUser,
    getUser,
    createUser,
    getAllUsers
};