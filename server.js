// Get dependencies
let express = require('express');
let path = require('path');
let http = require('http');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

// import the routing file to handle the default (index) route
let index = require('./server/routes/app');

// Import routing files for inventory, requests, and favorites
// const inventoryRoutes = require('./server/routes/inventory');
// const requestRoutes = require('./server/routes/requests');
// const favoriteRoutes = require('./server/routes/favorites');

let app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});
app.use(cors({
  allowedHeaders: ['responseType', 'Content-Type']
}));
// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/bks/browser')));

// Tell express to map the default route ('/') to the index route
app.use('/', index);
const requestRoutes = require('./server/routes/requests');
const favoriteRoutes = require('./server/routes/favorites');
const inventoryRoutes = require('./server/routes/inventory');

// Map your URLs to routing files
app.use('/inventory', inventoryRoutes);
app.use('/requests', requestRoutes);
app.use('/favorites', favoriteRoutes);

// Tell express to map all other non-defined routes back to the index page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/bks/browser', 'index.html'));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});

// establish a connection to the mongo database
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Database connected successfully'))
.catch(err => console.log(err));
