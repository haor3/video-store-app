const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database,  {useNewUrlParser: true});

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
})

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
})

const app = express();

const admins = require('./routes/admins');
const videos = require('./routes/videos');
const customers = require('./routes/customers');
// Port Number
const port = 3000;

// Set Static Folder 
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/admins', admins);
app.use('/videos', videos);
app.use('/customers', customers);

// Start Server
app.listen(port, () => {
    console.log('Server started on port' + port);
})