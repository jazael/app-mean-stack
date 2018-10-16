const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');

const app = express();

mongoose.connect('mongodb+srv://jazael:08uZnboqo7JX7E84@cluster0-vwsui.mongodb.net/node-angular?retryWrites=true', { useNewUrlParser: true })
  .then((value) => {
    console.log('Conectado');
  })
  .catch((err) => {
    console.log('Error al conectar --> ' + err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/posts', postsRoutes);

module.exports = app;
