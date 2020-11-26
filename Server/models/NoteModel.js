const mongoose = require('mongoose');

let noteSchema = new mongoose.Schema({
    _id: String, 
	Title : String,
	Content : String
});

exports.Notes = mongoose.model('note',noteSchema);
