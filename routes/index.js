var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var url="mongodb+srv://bss:2505@cluster0-k19vj.mongodb.net/test?retryWrites=true&w=majority";
router.post('/register', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;
	var newPerson = new User({
		email:personInfo.email,
		username: personInfo.username,
		password: personInfo.password,
		passwordConf: personInfo.passwordConf
	});

	newPerson.save(function(err, Person){
		if(err)
			console.log(err);
		else
			console.log('Success');
			res.send("Registered successfully!...")
	});
});
	router.post('/login', function (req, res, next) {
		//console.log(req.body);
		var username = req.body.username;
		mongoose.connect(url, function (err, db) {
			if (err) throw err;
			var query = User.findOne({ username }).select('username email password');
			query.exec(function (err, data) {
	
				// User.findOne({username:req.body.username},function(err,data){
				if (data) {
					if (data.password == req.body.password) {
						console.log("Done Login");
						res.send({ "Success": "Login success!", 'data': data });
					} else {
						res.send({ "Success": "Wrong password!", 'data': data });
					}
				} else {
					res.send({ "Success": "This user Is not regestered!", 'data': data });
				}
				//  res.send(data);
				console.log(data);
			});
		});
	});
	router.post('/getuser', function (req, res, next) {
		console.log(req.body)
			mongoose.connect(url, function (err, db) {
				if (err) throw err;
				var query = User.findOne({ username:req.body.username }).select('username email  password');
				query.exec(function (err, data) {
		
					// User.findOne({username:req.body.username},function(err,data){
					if (data) {
					
						res.send( data );
					}
					//  res.send(data);
					console.log(data);
				});
			});
		});
router.post('/deleteuser', function (req, res, next) {
	
	mongoose.connect(url, function (err, db) {
		if (err) throw err;
		var query = User.findOne({ username:req.body.username }).select('username email  password');
		query.exec(function (err, data) {

			if(data.username=req.body.username)
			var queryd=User.deleteOne({username:req.body.username});
			queryd.exec(function(err,data){
				if(data){
					res.send('deleted!..');
				}
			});
		});
	});
});
module.exports = router;