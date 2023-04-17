const express = require('express');
const fs = require('node:fs');
const mysql = require('mysql2');
const multer = require('multer');
require('dotenv').config();
const app = express();
const PORT = 8080;
const image = require('./modules/imageProcessing');
const getImage = require('./modules/retrieveImages');

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const upload = multer({ storage: multer.memoryStorage() });

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

app.post('/upload', upload.single('image'), (req, res) => image.imageUploading(req, res, connection));

app.get('/image/:id/', (req, res) => getImage(req, res, connection));
app.get('/image/small/:id/', (req, res) => getImage(req, res, connection, true));

app.get('/images', (req, res) => {
  connection.query('SELECT id FROM images.image_store;', (err, results) => {
    if (err) {
      res.status(500).send({ message: 'SEVER ERROR' });
      throw err;
    }

    res.status(200).send(
      results.map((row) => {
        return { imageId: row.id, imageLink: `http://localhost:${PORT}/image/${row.id}` };
      })
    );
  });
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
