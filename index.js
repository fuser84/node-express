const express = require('express');
const http = require('http');
const morgan = require('morgan');


const hostname = 'localhost';
const port = 3000;

//our application will be using express
const app = express();

//add additional info into the console due to dev parameter
app.use(morgan('dev'));

//serve the *.html from public folder
app.use(express.static(__dirname+  '/public'));

//method with function which will help to set up server
app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<html><body><h1>This is an Express Server</h1></body></html>`);
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});