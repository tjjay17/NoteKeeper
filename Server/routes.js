let router = require('express').Router();
let NoteController = require('./controllers/NoteController');

router.get('/',NoteController.home);
router.get('/allNotes',NoteController.getNotes);
router.post('/createOrUpdate',NoteController.createOrUpdate);
router.post('/createNote',NoteController.create);
router.delete('/noteToDelete/:id',NoteController.delete);

module.exports = router;