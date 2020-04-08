const express = require('express');

//routers
const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

const server = express();

//server.use
server.use(express.json());
server.use(logger);

//endpoints
server.use('/api/users', userRouter);
server.use('/api/users', postRouter);//per the setup of userRouter and the MVP requirements postRouter acttually looks like it is not required

//sanity test
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
function logger(req, res, next) {

  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get(
      "Origin"
    )}`
  );
  next();
}


module.exports = server;
