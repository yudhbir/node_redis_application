var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var albumsSchema = new Schema({
    id:  { type: Number},
    userId:  { type: Number},
    title: String,
});

var Albums = mongoose.model('albums', albumsSchema);

module.exports =Albums;