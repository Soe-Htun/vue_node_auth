const mysql = require('mysql2');
require("dotenv").config();
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const db =  mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: DB_PORT
});

// db.getConnection( async(err, connection) => {
//     if(err) throw (err)
//     console.log('DB connected successfull: ' + connection.threadId);

// })
db.connect(function(err) {
    if(err) throw err;
    console.log('Database connected');
})

module.exports = db;