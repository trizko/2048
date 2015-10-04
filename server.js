var express = require('express');
var app = express();
var port = 8888;

app.use(express.static(__dirname + '/public'));

app.get('/', function (request, response) {
    response.serveFile('public/index.html')
});

app.listen(port, function (error) {
    if (error) {
        console.error('something broke...');
    }
    console.log('listening at port ' + port.toString() + '...')
});
