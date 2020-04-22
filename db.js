
const mysql = require('mysql');

// connection configurations
const db = mysql.createPool({
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b034334d60b740',
    password: 'eb83d4bc',
    database: 'heroku_ef049c76cfde467'
});
 
// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
module.exports = db;