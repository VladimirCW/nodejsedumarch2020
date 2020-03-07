const express = require('express');
const app = express();
const port = 8000;

app.route('/admin')
    .get((req, res) => {
        res.send("GEt").end();
    })
    .post((req, res) => {
        res.send("POST").end();
    });


app.listen(port, () => console.log(`Listen on port: '${port}`));