const fs = require('node:fs');
const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
require('dotenv').config();
const app = express();
const PORT = 8080;
const image = require('./modules/imageProcessing');
const { getImageById, getImageInfo } = require('./modules/retrieveImages');
const { videoUpload } = require('./modules/videoProcessing');

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

// UPLOAD
app.post('/image/upload', upload.single('image'), (req, res) => image.imageUploading(req, res, connection));
app.post('/video/upload', upload.single('video'), (req, res) => videoUpload(req, res, connection));

// GET IMAGE BY ID
app.get('/image/:id/', (req, res) => getImageById(req, res, connection));
app.get('/image/small/:id/', (req, res) => getImageById(req, res, connection, true));

// GET ALL IMAGES
app.get('/images', (req, res) => getImageInfo(req, res, connection));

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
