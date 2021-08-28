const express = require('express');
const morgan = require('morgan');
const server = express();

// Settings
server.set('port', process.env.PORT || 3000)

// Middlewares
server.use(morgan('dev'));
server.use(express.json());

// Static Files
server.use(express.static(__dirname + '/public'));

// There's no other routes

// Catch all
server.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

server.listen(server.get('port'), () => {
  console.log("Server loaded in ", server.get('port'));
});