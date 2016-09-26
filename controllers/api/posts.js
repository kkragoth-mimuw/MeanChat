var Post = require('../../models/post')
var router = require('express').Router()
var websockets = require('../../websockets')
var pubsub = require('../../pubsub')

router.get('/', function (req, res) {
  Post
  .find()
  .sort({'date': -1})
  .limit(20)
  .exec(function(err, posts) {
    if (err) { return next(err) }
    res.json(posts)
  })
})

router.post('/', function (req, res) {
  var post = new Post({body: req.body.body})
  post.username = req.auth.username
  post.save(function(err, post) {
    if (err) { return next(err) }
    //websockets.broadcast('new_post', post)
    pubsub.publish('new_post', post)
    res.json(201, post)
  })
})

pubsub.subscribe('new_post', function (post) {
  websockets.broadcast('new_post', post)
})

module.exports = router
