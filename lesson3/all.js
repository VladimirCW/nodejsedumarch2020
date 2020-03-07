const express = require('express');
const app = express();
const port = 8000;
const fs = require('fs');
const path = require('path');


app.all('/', (req, res) => {
    res.send(`Method: ${req.method}`).end();
});

app.all('/admin', (req, res) => {
    res.send(`ADMIN - Method: ${req.method}`).end();
});

app.all('/users/:id/roles/:role', (req, res) => {
    res
        .send(`ADMIN - Method: ${req.method} and id is: ${req.params.id} 
                with role: ${req.params.role}`)
        .end();
});


// app.get('*.html', (req, res) => {
//     res.send(`<p>HELLO</p>>`).end();
// });
// app.get('*.html', (req, res) => {
//     fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
//         if(err) console.log(err);
//         console.log(data);
//         res.send(data).end();
//     });
// });

app.get('*.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('a+.html', (req, res) => {
    res.send(`Hello`).end();
});
app.get('b?a.html', (req, res) => {
    res.send(`Hello`).end();
});

app.get(/[a-zA-Z]+jpg|jpeg|gif/, (req, res) => {
    res.send(`Hello`).end();
});

app.listen(port, () => console.log(`Listen on port: '${port}`));