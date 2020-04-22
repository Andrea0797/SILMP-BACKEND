
const mysql = require('mysql');

// connection configurations
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'SISLMP_BD'
});
 
// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
module.exports = db;