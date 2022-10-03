const express = require('express');
require('dotenv').config();
const port = process.env.port;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

require("./route/index")

app.listen(port, () => {
    console.info(`The server is running on: http://localhost:${port}`)
})