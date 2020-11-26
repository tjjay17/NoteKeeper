const Notes = require('../models/NoteModel');

exports.home = (req,res) =>{
    res.send('hello');
}

exports.getNotes = (req,res) =>{
    Notes.Notes.find({}, (err, allNotes) => {
		if (err) {
			res.send(err);
		} else {
			res.json(allNotes);
		}
	});
}

exports.createOrUpdate = (req,res) =>{
    const id = req.body._id.trim();
	const title = req.body.title.trim();
	const content = req.body.content;

	Notes.findById(id, (err, note) => {
		if (err) {
			res.send(err);
	    }else if (note) {
			Notes.updateOne({ _id: id }, { Content: content }, (err, _) => {
				if (err) {
					res.send(err);
				}
				res.status(201).end();
			});
		} else {
			Notes.create({ _id: id, Title: title, Content: content });
			res.status(201).end();
        }
	});
}

exports.create = (req,res) =>{
    const id = req.body._id.trim();
	const title = req.body.title.trim();
	const content = req.body.content;

	Notes.create({ _id: id, Title: title, Content: content});
	res.status(200).end();
}

exports.delete = (req,res) =>{
    let toDelete = req.params.id;

	Notes.findByIdAndDelete(toDelete, (err) => {
		if (err) {
			res.send(err);
		} else {
			res.status(201).end();
        }
	});
}