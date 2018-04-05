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
      https   = require('https'),
      http    = require('http'),
      path    = require("path");

var httpsServer = https.createServer({
                    key:  fs.readFileSync(AppConfig.Keys.KEY),
                    cert: fs.readFileSync(AppConfig.Keys.CRT),
                    ca:   fs.readFileSync(AppConfig.Keys.CSR)
                  }, app);

var httpServer = http.createServer(app);

var listeningPort;
try {
  listeningPort = parseInt(process.argv[process.argv.length-1]);
} catch (e) {
  listeningPort = AppConfig.DEFAULT_PORT;
}

app.use(express.static('www'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/www/index.html'));
});

app.listen((listeningPort+1), function() {
  console.log('HTTPS Server listening on port ' + (listeningPort+1));
});

httpServer.listen(listeningPort, function() {
  console.log('HTTP Server listening on port ' + listeningPort);
});