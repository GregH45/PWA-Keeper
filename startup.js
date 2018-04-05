const express = require('express'),
      app = express();


app.use(express.static('www'));
app.listen(5000, function() {
  console.log('WebServer is listening');
});