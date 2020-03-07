const express = require('express');
const app = express();
const port = 8000;

app.get("/", (req, res) => {
    res.send("GET req").end();
    //res.send();
    //res.end();
});
app.post("/", (req, res) => {
    res.send("POST resq").end();
});
//app[METHOD, "/"]

app.listen(port, () => console.log(`Listen on port: '${port}`));