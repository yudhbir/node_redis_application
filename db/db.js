var mongoose = require('mongoose');
try {
  mongoose.connect('mongodb://localhost:27017/db_blog', { useNewUrlParser: true,useUnifiedTopology: true },function(){
  	console.log('databse is connected');
  });
} catch (error) {
  handleError(error);
}