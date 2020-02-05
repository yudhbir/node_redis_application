var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postsSchema = new Schema({
    id:  { type: Number},
    userId:  { type: Number},
    title: String,
    body:   String,  
});

var Posts = mongoose.model('posts', postsSchema);

module.exports =Posts;