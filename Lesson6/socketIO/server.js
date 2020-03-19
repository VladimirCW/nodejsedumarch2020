const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 8000;

const adminIO = io.of('/admin');

adminIO.on('connection', function(socket) {
    console.log("Connected to admin socket");
    socket.on('chat message', (msg) => {
        socket.emit('chat message', msg);
    });
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log("Got client request " + msg);
        console.log("****");
        socket.emit('chat message', msg);
    });
});

app.set('views', './templates'); // specify the views directory
app.set('view engine', 'pug'); // register the template engine
app.set('etag', false);

app.get('/', (req, res) => {
    res.render('index');
});

http.listen(port, () => console.log(`Listen on port: '${port}'`));