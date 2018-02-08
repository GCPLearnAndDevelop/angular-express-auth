const path = require('path');
const express = require('express');
const session = require('express-session');
// const MemcachedStore = require('connect-memcached')(session);
const passport = require('passport');
const config = require('./config');
const ouath2 = require('./oauth2');

const app = express();

app.disable('etag');
app.set('trust proxy', true);

app.use(express.static(path.join(__dirname, 'dist')));

// [START session]
// Configure the session and session storage.
// const sessionConfig = {
//   resave: false,
//   saveUninitialized: false,
//   secret: config.get('SECRET'),
//   signed: true
// };

// In production use the App Engine Memcache instance to store session data,
// otherwise fallback to the default MemoryStore in development.
// if (config.get('NODE_ENV') === 'production' && config.get('MEMCACHE_URL')) {
//   sessionConfig.store = new MemcachedStore({
//     hosts: [config.get('MEMCACHE_URL')]
//   });
// }

// app.use(session(sessionConfig));
// [END session]

// OAuth2
app.use(passport.initialize());
app.use(passport.session());
app.use(ouath2.router);

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
  const server = app.listen(config.get('PORT'), () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
}

module.exports = app;