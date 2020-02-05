var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentsSchema = new Schema({
    id:  { type: Number},
    postId:  { type: Number},
    name: String,
    email:   String,  
    body:   String,  
});

var Comments = mongoose.model('comments', commentsSchema);

module.exports =Comments;