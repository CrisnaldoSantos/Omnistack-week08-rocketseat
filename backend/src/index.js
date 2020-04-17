require('dotenv').config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)

const connectedUsers = {};

io.on('connection', socket =>{
  const {user} = socket.handshake.query;
  connectedUsers[user] = socket.id;
});
    
const port = process.env.PORT || 3333;

app.use((req, res, next) =>{
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(routes);


server.listen(port,()=>{
    console.log(`server enable listening ${port}!`)
});

module.exports = app;