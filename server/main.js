var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 5000;
var env = process.env.NODE_ENV || 'development'
var staticPath = env === 'production' ? './app/dist' : './app/public';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/', express['static'](staticPath));

app.get("/", function(req, res) {
   res.render('index', function(err, html) {
       if (err) {
           res.send(500);
       }

       res.set('Content-Type', 'text/html');
       res.send(200, new Buffer(html));
   });
});

app.listen(port, function() {
    console.log('Listening on port ' + port);
    console.log('NODE_ENV = ' + env);
});
