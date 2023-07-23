const mysql = require('mysql');
const express = require('express');
const app = express();
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.INSTANCE_PUBLIC_IP, // check your mysql instance
  port: process.env.PORT, // always port 3306
  user: process.env.DB_USER, // username that has no hostname
  password: process.env.DB_PASS, // user password
  database: process.env.DB_NAME, // database name
});

app.get('/student', async (req, res) => {
  try {
    const query = 'SELECT * FROM `new_table`';
    pool.query(query, (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        if (result.length === 0) {
          res.json({ status: 'Not found duck!!' });
        } else {
          res.json(result);
        }
      }
    });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(8081, () => {
  console.log('Server is running on port 8081');
});
