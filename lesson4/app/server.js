const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8001;
const fs = require('fs');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const urlDb = 'mongodb+srv://admin:123456aZ@cluster0-qssdp.mongodb.net/test?retryWrites=true&w=majority';
const ObjectId = require('mongodb').ObjectId;

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use('/', express.static('public'));
/*app.get('/', (req, res) => {
    res.render('index', {name: "Vova", age: 20});
});*/

app.use((req, res, next) => {
    fs.readFile(path.join(__dirname, 'db.json'), (err, data) => {
        if (err) console.log(err);
        const db = data;
        res.locals.db = JSON.parse(db.toString());
        next();
    })
});
//app.use('/album2', express.static('public2'));

MongoClient.connect(urlDb, (err, client) => {
    if (err) console.log(err);
    console.log("Connected to db");
    app.listen(port, () => console.log(`Listen on port: '${port}`));
    const collection = client.db('usersDb').collection('users');
    app.locals.collection = collection;

    process.on('SIGINT', () => {
        console.log("Close process");
        client.close();
        process.exit();
    });
});

app.route('/users')
    .get((req, res) => {
        app.locals.collection.find({}).toArray((err, data) => {
            //"name": {$in: ["Vova", "Vitya"]
            res.status(200).json(data);
        });
    })
    .post((req, res) => {
        app.locals.collection.insertOne(req.body, (err, data) => {
            res.send(`User with id: '${data.ops._id}' was created`).end();
        });
    });

app.route('/users/:id')
    .get((req, res) => {
        app.locals.collection.findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
            res.status(200).json(data);
        });
    })
    .put((req, res) => {
        app.locals.collection.findOneAndUpdate(
            { _id: ObjectId(req.params.id) },
            { $set: req.body },
            { returnNewDocument: false },
            (err, data) => {
                console.log(data);
                res.send(`User with id: '${data.value._id}' was updated`).end();
            });
    })
    .delete((req, res) => {
        app.locals.collection.findOneAndDelete({ _id: ObjectId(req.params.id) }, (err, data) => {
            res.send(`User with id: '${data.value._id}' was deleted`).end();
        });
    });