process-dataset
===============

Allow to share native data between submodules using `process.dataset` global variable

How it works
------------

At the first run it creates special object with simple interface.
Any other `require` in submodules just takes and exports that object.
Object stored in a global object `process` in `dataset` property.
So any submodule at any level can use common dataset.

Example
-------

```js
// /app.js
var http = require('http');
var storage = require('process-dataset');
var server = require('lib/server.js');

// /lib/server.js
var storage = require('process-dataset');
var server = http.createServer(function (req, res) {
  if (storage.get('auth')) {
    res.end('You have authorized: '+storage.auth);
  } else {
    res.end('Nothing to show');
  }
});
server.listen(8880);

storage.set('server', server);
module.exports = server;

// /lib/sessions.js
var storage = require('process-dataset');
var server = storage.get('server');


```