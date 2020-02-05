var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usersSchema = new Schema({
  id:  { type: Number},
  name: String,
  username:   String,
  email: String,
  address: {
        street : String,
        suite : String,
        city : String,
        zipcode : String,
        geo : {
            lat : String,
            lng : String,
        }
  },
  phone: String,
  website: String,
  company : {
      nam : String,
      catchPhras : String,
      bs: String
    }
});

var User = mongoose.model('users', usersSchema);

module.exports =User;