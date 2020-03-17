var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/apiposts');

var postSchema = new mongoose.Schema({
  title: String,
  content: String
  },
  {collection: 'posts'} 
);

module.exports = { Mongoose: mongoose, PostSchema: postSchema }