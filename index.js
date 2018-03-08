const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const hostname = 'localhost';
const port = 3000;

//our application will be using express
const app = express();

//add additional info into the console due to dev parameter
app.use(morgan('dev'));

//parse body request which is in JSON format - middleware
app.use(bodyParser.json());
app.all('/dishes', (req, res, next) => {
   res.statusCode = 200;
   res.setHeader('Content-Type', 'text/plain');
   next();
});

app.get('/dishes', (req, res, next) => {
   res.end("Will send all the dishes to you");
});

app.post('/dishes', (req,res,next) => {
    res.end(`Will add the dish: ${req.body.name} with details ${req.body.description}`);
});

app.put('/dishes', (req,res,next) => {
    res.statusCode = 403;
    res.end(`PUT operation is not supported on dishes`);
});

app.delete('/dishes', (req, res, next) => {
    res.end("Deleting all the dishes!!!");
});

//dishId part
app.get('/dishes/:dishId', (req, res, next) => {
    res.end(`Will send details of the dish: ${req.params.dishId} to you!`);
});

app.post('/dishes/:dishId', (req,res,next) => {
    res.statusCode = 403;
    res.end(`POST operation is not supported on /dishes/ ${req.params.dishId}`);
});

app.put('/dishes/:dishId', (req,res,next) => {
    res.write(`Updating the dish ${req.params.dishId}\n`);
    res.end(`Will update the dish: ${req.body.name} with details: ${req.body.description}`);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end(`Deleting dish ${req.params.dishId}`);
});



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