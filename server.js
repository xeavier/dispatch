//Get dependencies
const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Connect to our MongoDB database
// mongoose.connect("mongodb://localhost:27017/dispatch");


//Get our API routes
const api = require('./server/routes/api');

//Set express
const app = express();

//Parser for post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

//Set our API routes
app.use('/api', api);

// Catch all other routes and return the index file.  This catch-all route must come after all other
// API routes have been defined.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);


/**
 * Create HTTP server.
 */
const server = http.createServer(app);


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
