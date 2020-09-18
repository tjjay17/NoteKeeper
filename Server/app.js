const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const uri = "MongoDB_URI";
const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/*app.all('*', function (req, res, next) {
	var origin = req.get('origin');
	res.header('Access-Control-Allow-Origin', origin);
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
})*/


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Database Connected Successfully"))
	.catch(err => console.log(err));


let noteSchema = new mongoose.Schema({
	_id: String, 
	Title : String,
	Content : String
});

const Notes = mongoose.model('note',noteSchema);



app.get('/', (req, res) => {
	res.send("Here is my response.");
	
});

app.get('/allNotes',(req, res) => {

	Notes.find({}, (err, allNotes) => {
		if (err) {
			res.send(err);
		} else {
			res.json(allNotes);
		}
	});
});

app.post('/createOrUpdate', (req, res) => {
	const id = req.body._id.trim();
	const title = req.body.title.trim();
	const content = req.body.content;

	Notes.findById(id, (err, note) => {
		if (err) {
			res.send(err);
		} else if (note) {

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

});

app.post('/createNote', (req, res) => {
	const id = req.body._id.trim();
	const title = req.body.title.trim();
	const content = req.body.content;

	Notes.create({ _id: id, Title: title, Content: content});

	res.status(200).end();

});

app.delete('/noteToDelete/:id', (req, res) => {
	let toDelete = req.params.id;

	Notes.findByIdAndDelete(toDelete, (err) => {
		if (err) {
			res.send(err);
		} else {
			res.status(201).end();
        }
	});
});

app.listen(PORT);

