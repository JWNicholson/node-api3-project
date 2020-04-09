require("dotenv").config(); // reads values from .env file and merges them into process.env

const server = require('./server.js');

const port = process.env.PORT || 7000;
//const port = 7000;

server.listen(port, () => {
    console.log(`\n=== server running on port ${port}\n ===`);
});