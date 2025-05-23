const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Aru.n@h456',
  database: 'taskdb'
});

conn.connect(err => {
  if (err) throw err;
  console.log("MySQL connected");
});

module.exports = conn;
