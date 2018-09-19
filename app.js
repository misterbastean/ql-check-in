// TODO
// - Add authentication and authorization to view reports
// - Add feedback after punches (connect-flash)

const express 		= require('express'),
	app 						= express(),
	mongoose 				= require('mongoose'),
	bodyParser 			= require('body-parser'),
	config 					= require('./config'),
	methodOverride 	= require('method-override'),
	passport				= require('passport'),
	LocalStrategy		= require('passport-local'),
	User						= require('./models/user');

// Require Routes
const indexRoutes = require('./routes/index'),
	studentRoutes = require('./routes/students'),
	punchRoutes = require('./routes/punches');

mongoose.Promise = global.Promise;
mongoose.connect(
	`mongodb://${config.database.username}:${config.database.password}@${
		config.database.dbhost
	}`,
	{ useNewUrlParser: true }
);
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public')); // Publish assets folder
app.use(methodOverride('_method'));

// Passport config
app.use(require('express-session')({
	secret: config.passport.secret,
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Routes
app.use(indexRoutes);
app.use('/students', studentRoutes);
app.use(punchRoutes);

// Port/IP Listening
app.listen(3000, () => console.log('Check-In Running on port 3000'));
