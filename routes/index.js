const express = require('express'),
	router = express.Router(),
	User						= require('../models/user'),
	passport = require('passport');

// Landing Page
router.get('/', (req, res) => {
	res.render('landing');
});

// Index Page
router.get('/index', (req, res) => {
	res.render('index');
});

// Show Report Request Form
router.get('/report', (req, res) => {
	res.render('report')
});

// Request Report Data
router.post('/report', (req, res) => {
	const sid = req.body.sid
	res.redirect(`/students/${sid}`)
});

// ==============
// AUTH ROUTES
// ==============

// Show register Form
router.get('/register', (req, res) => {
	res.render('register')
});

// Handle signup logic
router.post('/register', (req, res) => {
		const newUser = new User({username: req.body.username});
		User.register(newUser, req.body.password, (err, user) => {
			if (err) {
				console.log(err);
				return res.render('register');
			}
			passport.authenticate('local')(req, res, () => {
				res.redirect('/')
			});
		});
});

module.exports = router;
