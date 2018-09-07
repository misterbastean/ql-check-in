const express         = require('express'),
      app             = express(),
      mongoose        = require('mongoose'),
      bodyParser      = require('body-parser'),
      config          = require('./config'),
      methodOverride  = require('method-override');


mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.database.username}:${config.database.password}@${config.database.dbhost}`, { useNewUrlParser: true })
app.use(bodyParser.urlencoded({extended: true}));
app.set('view enging', 'ejs')
app.use(express.static('public')); // Publish assets folder
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.send('Root route')
});





// Port/IP Listening
app.listen(3000, () => console.log("Check-In Running on port 3000"))
