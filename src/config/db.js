const mysql = require("mysql");
require("dotenv").config();

const conn = mysql.createConnection({
    host: process.env.host,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password
})

conn.connect((error) => {
    if(error){
        console.error(error);
    } else {
       console.info("connected in sucessfull")
    }
})