const AppConfig = {
		  DEFAULT_PORT : 5000,
          Keys: {
            KEY: __dirname + '/keys/private.key',
            CSR: __dirname + '/keys/localhost.csr',
            CRT: __dirname + '/keys/intermediate.crt'
          }
        };

const express = require('express'),
      app     = express(),
      fs      = require('fs'),
      https   = require('https');

let server = https.createServer({
    key:  fs.readFileSync(AppConfig.Keys.KEY),
    cert: fs.readFileSync(AppConfig.Keys.CRT),
    ca:   fs.readFileSync(AppConfig.Keys.CSR)
  }, app);

var listeningPort;
try {
  listeningPort = parseInt(process.argv[process.argv.length-1]);
} catch (e) {
  listeningPort = AppConfig.DEFAULT_PORT;
}

app.use(express.static('www'));
server.listen(listeningPort, function() {
  console.log('WebServer is listening on port ' + listeningPort);
});