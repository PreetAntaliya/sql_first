const mysql = require( 'mysql' );

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_first',
    connectionLimit : 10,
})

pool.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});




module.exports = pool