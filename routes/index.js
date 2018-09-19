const express = require('express'),
	router = express.Router(),
	User						= require('../models/user'),
	passport = require('passport'),
	middleware = require('../utils/middleware');

// Landing Page
router.get('/', (req, res) => {
	res.render('landing');
});

// Index Page
router.get('/index', (req, res) => {
	res.render('index');
});

// Show Report Request Form
router.get('/report', middleware.isLoggedIn, (req, res) => {
	res.render('report')
});

// Request Report Data
router.post('/report', middleware.isLoggedIn, (req, res) => {
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

// Show login Form
router.get('/login', (req, res) => {
	res.render('login');
});

// Log user in
router.post('/login',
	passport.authenticate(
		'local',
		{
			successRedirect: '/',
			failureRedirect: '/login'
		}),
		(req, res) => {
			console.log('Error in /login post route');
	}
);

// Log user Out
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('error', 'Logged you out!')
	res.redirect('/');
});

module.exports = router;
