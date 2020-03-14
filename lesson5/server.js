const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8001;
const path = require('path');
const mongoose = require('mongoose');
const urlDb = 'mongodb+srv://admin:123456aZ@cluster0-qssdp.mongodb.net/usersDb?retryWrites=true&w=majority';
const routers = require('./views');
const controllers = require('./controlers');

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use('/', express.static('public'));
app.set('etag', false);
app.use(routers.LoginRouter);
app.use('/users*', controllers.LoginController.verifyUser);
app.use(routers.UsersRouter);
app.use(routers.UserLoginsRouter);
app.use(routers.HtmlRouter);

mongoose.connect(urlDb, {
    useNewUrlParser   : true,
    useUnifiedTopology: true
}, (err, connection) => {
    if (err) console.log(err);
    console.log("Connected to db");
    app.listen(port, () => console.log(`Listen on port: '${port}`));
    process.on('SIGINT', () => {
        console.log("Close process");
        connection.close();
        process.exit();
    });
});
