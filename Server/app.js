const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
//const uri = "MongoDB_URI" || '';
const app = express();
const routes = require('./routes');

mongoose.connect('mongodb://localhost:27017/KeeperDB', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Database Connected Successfully"))
	.catch(err => console.log(err));

app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/',routes);

app.get('/wow',(req,res) =>{
	console.log(__dirname);
})
app.listen(PORT);

