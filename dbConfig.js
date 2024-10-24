
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'expressrawcurd',
    password: 'password',
    database: 'expressrawcurd'
})

connection.connect((err) => {
    if(err) {
        console.log('Error in DB connection: ' + JSON.stringify(err, undefined, 2));
    } else {
        console.log('DB connected successfully')
    }
})

module.exports = connection