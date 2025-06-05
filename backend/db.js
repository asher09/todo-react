const mongoose = require('mongoose');

mongoose.connect    ("mongodb+srv://mdb-assig:mdb-assig@mdb-assig.ropbrfc.mongodb.net/todo")
const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', todoSchema);
module.exports = {
    todo
}
 