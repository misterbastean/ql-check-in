const express = require('express'),
	router = express.Router();

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



module.exports = router;
