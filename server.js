var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(require('./auth'))

app.use(bodyParser.json())
app.use('/api/posts', require('./controllers/api/posts'))
app.use('/api/sessions', require('./controllers/api/sessions'))
app.use('/api/users', require('./controllers/api/users'))
app.use(require('./controllers/static.js'))


var server = app.listen(3000, function() {
  console.log('Server is listening on port number: ', 3000);
})
require('./websockets').connect(server)
