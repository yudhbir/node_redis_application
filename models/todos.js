var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var todosSchema = new Schema({
    id:  { type: Number},
    userId:  { type: Number},
    title: String,
    completed: Boolean,    
});

var Todos = mongoose.model('todos', todosSchema);

module.exports =Todos;