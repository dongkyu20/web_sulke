const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'nakge.synology.me',
  port: 48652,
  user: 'soft_web',
  password: 'soft_web',
  database: 'softsulke_web',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

module.exports = promisePool;
