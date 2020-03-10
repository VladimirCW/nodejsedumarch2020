const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const fs = require('fs');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use('/', express.static('public'));
app.use((req, res, next) => {
    fs.readFile(path.join(__dirname, 'db.json'), (err, data) => {
        if (err) console.log(err);
        const db = data;
        res.locals.db = JSON.parse(db.toString());
        next();
    })
});
//app.use('/album2', express.static('public2'));

app.route('/users')
    .get((req, res) => {
        res.status(200).json(res.locals.db);
    })
    .post((req, res) => {
        const userBody = req.body;
        const newId = Object.keys(res.locals.db).length + 1;
        res.locals.db[newId] = userBody;
        fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(res.locals.db), (err) => {
            if (err) console.log(err);
            res.send(`User with id: '${newId}' was created`).end();
        });
    });

app.route('/users/:id')
    .get((req, res) => {
        res.status(200).json(res.locals.db[req.params.id]);
    })
    .put((req, res) => {
        const userBody = req.body;
        const id = req.params.id;
        res.locals.db[id] = userBody;
        fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(res.locals.db), (err) => {
            if (err) console.log(err);
            res.send(`User with id: '${id}' was updated`).end();
        });
    })
    .delete((req, res) => {
        delete res.locals.db[req.params.id];
        fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(res.locals.db), (err) => {
            if (err) console.log(err);
            res.send(`User with id: '${req.params.id}' was deleted`).end();
        });
    });

app.listen(port, () => console.log(`Listen on port: '${port}`));