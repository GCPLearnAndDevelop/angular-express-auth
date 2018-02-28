const path = require('path');
const express = require('express');
const session = require('express-session');
const MemcachedStore = require('connect-memjs')(session);
const passport = require('passport');
const config = require('./config');
const ouath2 = require('./oauth2');

const userApi = require('./routes/user');

const app = express();

app.disable('etag');
app.set('trust proxy', true);

app.use(express.static(path.join(__dirname, 'dist')));

let MEMCACHE_URL;

if (process.env.USE_GAE_MEMCACHE) MEMCACHE_URL = `${process.env.GAE_MEMCACHE_HOST}:${process.env.GAE_MEMCACHE_PORT}`;
else MEMCACHE_URL = config.get('LOCAL_GAE_MEMCACHE');

// [START session]
// Configure the session and session storage.
const sessionConfig = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET || config.get('SECRET'),
  signed: true,
  store: new MemcachedStore({
    hosts: [MEMCACHE_URL]
  })
};

app.use(session(sessionConfig));
// [END session]

// OAuth2
app.use(passport.initialize());
app.use(passport.session());
app.use(ouath2.router);

//API's
app.use('/api/user', userApi);

// Redirect root to /home
app.get('/', (req, res) => {
  res.redirect('/home');
});

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Basic error handler
app.use((err, req, res, next) => {
  /* jshint unused:false */
  console.error(err);
  // If our routes specified a specific response, then send that. Otherwise,
  // send a generic message so as not to leak anything.
  res.status(500).send(err.response || 'Something broke!');
});

if (module === require.main) {
  // Start the server
  const server = app.listen( process.env.PORT || config.get('PORT') , () => {
    const port = server.address().port;
    console.log(`App listening on host::${ process.env.HOST || config.get("HOST") } and port::${ process.env.PORT || config.get('PORT') }`);
  });
}

module.exports = app;