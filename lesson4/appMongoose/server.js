const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8001;
const fs = require('fs');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const urlDb = 'mongodb+srv://admin:123456aZ@cluster0-qssdp.mongodb.net/usersDb?retryWrites=true&w=majority';
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const url = require('url');
const jwt = require('jsonwebtoken');
const secretKey = "secret";

const verifyUser = (req, res, next) => {
    if(req.headers.authorization) {
        const tokenBearer = req.headers.authorization;
        const token = tokenBearer.split(' ')[1];
        if(!token) {
            res.status(401).send("You are not authorized!").end();
        }
        jwt.verify(token, secretKey, (err, data) => {
            if(err) console.log(err);
            next();
        });
    } else {
        res.status(401).send("You are not authorized!").end();
    }
};

const RoleSchema = new Schema({
    role   : {
        type    : String,
        required: true
    },
    source : {
        type    : String,
        required: false,
        default : "admin"
    },
    granted: {
        type    : String,
        required: true
    }
});
const UserSchema = new Schema({
    name   : {
        type    : String,
        required: true
    },
    address: {
        type    : String,
        required: false,
        default : "Kyiv"
    },
    roles  : [RoleSchema]
});
const UserLoginSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        default: "default@email.com"
    }
});
const UserLogin = mongoose.model('userlogin', UserLoginSchema);
const User = mongoose.model('user', UserSchema);

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use('/', express.static('public'));
app.use('/users*', verifyUser);
app.set('etag', false);
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

mongoose.connect(urlDb, {
    useNewUrlParser   : true,
    useUnifiedTopology: true
}, (err, connection) => {
    if (err) console.log(err);
    console.log("Connected to db");
    app.listen(port, () => console.log(`Listen on port: '${port}`));
    process.on('SIGINT', () => {
        console.log("Close process");
        client.close();
        process.exit();
    });
});

app.get('/*.html', (req, res) => {
    const page = url.parse(req.url).pathname.slice(1).split('.')[0];
    res.render(page);
});

app.route('/userlogins')
    .post((req, res) => {
        UserLogin.create(req.body, (err, data) => {
            if(err) console.log(err);
            res.status(201).send(`User with id: '${data._id}' was created`).end();
        })
    });

app.route('/login')
    .post((req, res) => {
        UserLogin.findOne({name: req.body.name}, (err, data) => {
           if(err) console.log(err);
           if(req.body.password == data.password) {
                const token = jwt.sign({ name: data.name }, secretKey, {expiresIn: '1h'});
                res.status(200).json({token: token}).end();
           } else {
               res.status(401).send({message: "You are not authorized!"}).end();
           }
        });
    });

app.route('/users')
    .get((req, res) => {
        User.find({}, (err, data) => {
            if (err) console.log(err);
            res.status(200).json(data);
        });
    })
    .post((req, res) => {
        User.create(req.body, (err, data) => {
            if(err) console.log(err);
            res.send(`User with id: '${data._id}' was created`).end();
        });
    });

app.route('/users/:id')
    .get((req, res) => {
        User.find({ _id: req.params.id }, (err, data) => {
            if (err) console.log(err);
            res.status(200).json(data);
        });
    })
    .put((req, res) => {
        User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true },
            (err, data) => {
                if (err) console.log(err);
                res.send(`User with id: '${data._id}' and with name: "${data.name}" was updated`).end();
            });
    })
    .delete((req, res) => {
        User.findOneAndRemove({ _id: req.params.id }, (err, data) => {
            if (err) console.log(err);
            res.send(`User with id: '${data._id}' was deleted`).end();
        });
    });