const http = require('http');
const app = http.createServer();
const port = 8000;
const fs = require('fs');
const path = require('path');
const url = require('url');



app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

app.on('request', function(request, response) {
    switch (request.method) {
        case "GET": {
            switch (url.parse(request.url).pathname) {
                case "/users": {
                    response.writeHead(200).end("Users list");
                }
                case "/addresses": {
                    response.writeHead(200).end("Address list.");
                }
            }
            break;
        }
        case "POST": {
            switch (url.parse(request.url).pathname) {
                case "/users": {
                    request.on('data', function (data) {
                        response.writeHead(200).end(data.toString().toUpperCase());
                    });
                    break;
                }
                case "/addresses": {
                    response.writeHead(200).end("Address list.");
                    break;
                }
            }
            break;
        }
        case "PUT": {
            response.writeHead(202).end("Object modified");
            break;
        }
        case "DELETE": {
            response.writeHead(200).end("Object deleted");
            break;
        }
        default: {
            response.writeHead(404).end("Method is not available!!!");
        }
    }
    fs.readFile(path.join(__dirname, 'index.html'), function (err, data) {
        if(err) console.log(err);
        response.writeHead(202, {"first": "second"})
            .end(data);
    });
});
//localhost:8000
//http://127.0.0.1:8000

