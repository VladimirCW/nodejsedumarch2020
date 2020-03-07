const express = require('express');
const app = express();
const port = 8000;

const connect = (req, res, next) => {
    console.log("Connected");
    console.log("Before connect " + res.locals.db);
    res.locals.db = "@@@@";
    next();
};

//app.use('/admin', [connect, connect, connect]);
app.use('/', [connect]);

app.get('/', (req, res, next) => {
    console.log("After connect " + res.locals.db);
    console.log("Response 1 GET finished" + res.locals.db);
    next();
    //res.send("Hello").end();
});
app.get('/', (req, res) => {
    console.log("Response 2 GET finished");
    res.send("Hello").end();
});
app.post('/', (req, res) => {
    console.log("Response POST finished");
    res.send("Hello").end();
});


app.listen(port, () => console.log(`Listen on port: '${port}`));