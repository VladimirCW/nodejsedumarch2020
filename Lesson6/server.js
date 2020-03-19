const express = require('express');
const app = express();
const ws = require('ws');
const http = require('http').createServer(app);
const wss = new ws.Server({server: http});
const port = 8000;

wss.on('connection', (ws) => {
    console.log("Connection established");
    ws.on('message', (err, data) => {

    });
    const interval = setInterval(() => {
        ws.send(Math.random());
    }, 1000);
    setTimeout(() => {
        clearInterval(interval);
    }, 7000);
    ws.send("Hello, connection started");

});

app.set('views', './templates'); // specify the views directory
app.set('view engine', 'pug'); // register the template engine

app.get('/', (req, res) => {
    res.render('index');
});

http.listen(port, () => console.log(`Listen on port: '${port}'`));