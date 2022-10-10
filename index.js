//require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser');
const Client = require('./config/db');
const url = require('./routes/urlRoute')

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended:false, useNewUrlParser: true, useUnifiedTopology: true }));

app.use(bodyParser.json());

Client();

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/api/shorturl', url);

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
