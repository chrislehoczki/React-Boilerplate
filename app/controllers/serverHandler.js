'use strict';

var Users = require('../models/users.js');

var bodyParser = require('body-parser');

function ServerHandler () {

	this.getBooks = function(req, res) {


		//CUSTOM QUERY BASED ON FACEBOOK OR LOCAL LOGIN
			var query = {"facebook.id": req.user.facebook.id};
			if (req.user.local.username) {
				query = {"local.username": req.user.local.username};
			}

		Users.findOne(query, { books: 1, _id: 0 })
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result);
				});
	},

	this.addBook = function(req, res) {
			var title = req.params.book;
			var author = req.params.author;
			var img = req.params.img;

			console.log(title)
			console.log(author)
			console.log(img)

			var ownerName = req.user.local.username || req.user.facebook.name

			var bookObj = {}

			bookObj.title = title;
			bookObj.author = author;
			bookObj.imgID = img;
			bookObj.requested = false;
			bookObj.confirmed = false;
			bookObj.requestedBy = "no-one yet";
			bookObj.ownerName = ownerName;
			console.log(bookObj)

			var bool = true;

			//CUSTOM QUERY BASED ON FACEBOOK OR LOCAL LOGIN
			var query = {"facebook.id": req.user.facebook.id};
			if (req.user.local.username) {
				query = {"local.username": req.user.local.username};
			}

			Users.findOne(query, { books: 1, _id: 0 })
			.exec(function (err, result) {
					if (err) { throw err; }
					console.log(result)
					
					result.books.map(function(book) {
						if (book.title === title) {
							bool= false;
							res.send("You've already added this book!")
						}

					})
					
					//IF NOT ALREADY IN OWNERS COLLECTIONS
					if (bool) {
			Users
			.findOneAndUpdate(query, { $push: { books: bookObj } }, {"new": true})
			.exec(function (err, result) {
					if (err) { throw err; }
					
		

					res.send("Nice! You added " + title + " by " + author + ".");
					
					});//END OF QUERY2 

					}




				});

			


	},



	this.addUserInfo = function(req, res) {

		var country = req.body.country;
		var city = req.body.city;
		var fullName = req.body.fullName
		console.log(fullName)

		//CUSTOM QUERY BASED ON FACEBOOK OR LOCAL LOGIN
			var query = {"facebook.id": req.user.facebook.id};
			if (req.user.local.username) {
				query = {"local.username": req.user.local.username};
			}
		
		Users
			.findOneAndUpdate(query, { $set: { country: country, city: city, fullName: fullName } }, {"new": true})
			.exec(function (err, result) {
					if (err) { throw err; }
					
					var user = {};
					user.city = result.city;
					user.country = result.country;
					user.fullName = result.fullName
					

					res.json(user);
					
					});
	
	},

	this.changePass = function(req, res, next) {
		//req.body contains currentpass, newpass and newpassconfirmed
		if (req.body.newpass !== req.body.newpassconfirmed) {
        throw new Error('password and confirm password do not match');
     }

     var User = req.user;

     User.local.password = req.body.newpass;
     
     //PASSPORT SHOULD RECOGNISE THAT PASSWORD IS CHANGED AND HASH IT BEFORE SAVING....
     User.save(function(err, result){
         if (err) { next(err) }
         else {
             res.json(result)
         }
     });

	},


	this.getUserDetails = function(req, res) {

		var query = {"facebook.id": req.user.facebook.id};
			if (req.user.local.username) {
				query = {"local.username": req.user.local.username};
			}

		Users.findOne(query, { _id: 0 })
			.exec(function (err, result) {
					if (err) { throw err; }
				var name = result.fullName || result.local.username || result.facebook.name;
				var country = result.city;
				var city = result.country;

				var user = {}
				user.name = name;
				user.city = city;
				user.country = country;

				res.json(user)
			});


		}


}

module.exports=ServerHandler;