const express = require('express');
const fs = require('node:fs');
const mysql = require('mysql2');
require('dotenv').config();
const app = express();
const PORT = 8080;

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const { HOST, USER, PASSWORD, DATABASE } = process.env;

const connection = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  port: 3306,
  ssl: { ca: fs.readFileSync('./DigiCertGlobalRootCA.crt.pem') },
});

connection.connect((err) => {
  if (err) {
    console.error(`Error connecting: ` + err.stack);
  }
});

app.get('/upload', (req, res) => {
  const { image } = req.params;
  const sql = 'insert into image_store (image) values (?)';
  console.log(req.body);

  connection.execute(sql, [image], (err) => {
    if (err) {
      res.status(500).send({ message: 'SEVER ERROR' });
      throw err;
    }
    res.status(200).send({ message: 'image Uploaded' });
  });
});

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
