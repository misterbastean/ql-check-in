const express         = require('express'),
      app             = express(),
      mongoose        = require('mongoose'),
      bodyParser      = require('body-parser'),
      config          = require('./config'),
      methodOverride  = require('method-override');

// Require Routes
const indexRoutes     = require('./routes/index'),
      studentRoutes   = require('./routes/students'),
      punchRoutes     = require('./routes/punches');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.database.username}:${config.database.password}@${config.database.dbhost}`, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')
app.use(express.static('public')); // Publish assets folder
app.use(methodOverride('_method'));

// Routes
app.use(indexRoutes);
app.use(studentRoutes);
app.use(punchRoutes);

// Port/IP Listening
app.listen(3000, () => console.log("Check-In Running on port 3000"))
