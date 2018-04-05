const express = require('express'),
      app = express();

var listeningPort;
try {
  listeningPort = parseInt(process.argv[process.argv.length-1]);
} catch (e) {
  listeningPort = 5000;
}

app.use(express.static('www'));
app.listen(listeningPort, function() {
  console.log('WebServer is listening on port ' + listeningPort);
});