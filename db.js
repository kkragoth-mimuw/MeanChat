var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/social', function(err) {
  if (err) throw err;
  console.log("Connection with mongodb established");
})

module.exports = mongoose
