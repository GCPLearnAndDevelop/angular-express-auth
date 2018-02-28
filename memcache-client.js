// const memjs = require('memjs');
// const config = require('./config');

// let MEMCACHE_URL;

// if (process.env.USE_GAE_MEMCACHE) MEMCACHE_URL = `${process.env.GAE_MEMCACHE_HOST}:${process.env.GAE_MEMCACHE_PORT}`;
// else MEMCACHE_URL = config.get('LOCAL_GAE_MEMCACHE');

// const memcache_client = memjs.Client.create(MEMCACHE_URL);

// function set(key, value) {
//     memcache_client.set(key, value);
// }

// async function check(key) {
//     await memcache_client.get(key, function (err, value) {
//         if (value != null) return true;
//         return false ;
//     });
// }

// async function get(key) {
//     await memcache_client.get(key, function (err, value) {
//         if (value != null) return value;
//         return null;
//     });
// }

// module.exports = {
//     set: set,
//     check: check,
//     get: get
// };