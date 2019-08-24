var express = require('express');
//var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


mongoose.connect('mongodb+srv://bss:2505@cluster0-k19vj.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('opened connection')
});


app.set('views', path.join(__dirname, 'views'));
	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var index = require('./routes/index');
app.use(require('./routes/index'))

app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});