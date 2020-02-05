var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var photosSchema = new Schema({
    id:  { type: Number},
    albumId:  { type: Number},
    title: String,
    url: String,
    thumbnailUrl: String,
});

var Photos = mongoose.model('photos', photosSchema);

module.exports =Photos;