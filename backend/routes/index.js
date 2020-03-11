const express = require('express');
const router = express.Router();
const db = require('../db');
const Post = db.Mongoose.model('posts', db.PostSchema);

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message:"hooray! this shit works!"});
});
/*get all records*/
router.get('/posts', function(req, res, next) {
  console.log('get all records');
  Post.find(function(err, posts) {
    if (err)
      res.send(err);
    res.json(posts);
    });
});
/*get one record by id*/
router.get('/posts/:id', function(req, res, next) {
  console.log('get one record by id');
  Post.findById(req.params.id, function(err, post) {
    if (err)
        res.send(err);
    res.json(post);
  });
});
/*create new record*/
router.post('/posts/', function(req, res, next) {
  console.log('create new record.');
  var newPost = new Post({title: req.body.title, content: req.body.content});
  newPost.save(function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      res.end();
      return;
    }
    res.json(newPost);
    res.end();
  });
});
/*edit one record*/
router.put('/posts/:id', function(req, res, next){
  console.log('edit one record');
  Post.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert:true }, function(err, doc) {
    if (err) {
      res.status(500).json({err: err.message });
      res.end();
      return;
    }
    res.json(req.body);
    res.end();
  });
});
/*Delete from a client*/
router.delete('/posts/:id', function(req, res, next){
  console.log('Delete from a client');
  Post.find({ _id: req.params.id }).remove( function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      res.end();
      return;
    }
    res.json({sucess: true});
    res.end();
  })
});

module.exports = router;
