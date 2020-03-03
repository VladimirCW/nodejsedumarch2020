const http = require('http');
const app = http.createServer();
const port = 8000;

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

app.on('request', function (request, response) {
    switch (request.method) {
        case 'GET': {
            response.writeHead(200);
                response.end('GET is OK!!!');
            break;
        }
        case 'POST': {
            response.writeHead(201).end('Object created');
            break;
        }
        case 'PUT': {
            response.writeHead(202).end('Object modified');
            break;
        }
        case 'DELETE': {
            response.writeHead(200).end('Object deleted');
            break;
        }
        default: {
            response.writeHead(404).end('Method is not available!!!');
        }
    }
});