const express = require('express');

//router
const userRouter = require('./users/userRouter');

const server = express();

//server.use functions
server.use(express.json());
server.use(logger);

//endpoints
server.use('./api/users', userRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(req.url);
  console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get(
        "Origin"
      )}`
  );
  next();
}

module.exports = server;
