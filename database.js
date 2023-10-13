    /*  IMPORTS  */

require('dotenv').config();

const {
    createPool 
} = require('mysql');


    /*  CREATE POOL CONNECTION  */
const pool  = createPool({
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    port            : process.env.DB_PORT,
    database        : process.env.DB_DATABASE,
    connectionLimit : 10
});

    /*  CHECK IF MYSQL DATABASE CONNECTED SUCCESSFULLY */
pool.query(`select * from sportlist`, (err, result, fields) => {
    if(err){
        return console.log(err);
    }
    return console.log("Database connected successfully.");
})

module.exports = pool;