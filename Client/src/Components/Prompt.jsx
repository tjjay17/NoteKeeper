import React,{useState,useRef} from 'react';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Fab from '@material-ui/core/Fab';
import axios from 'axios';


function NotePrompt(props){
	const [fullNote, updateContent] = useState({
		title: '',
		content: ''
	});

	const titlePointer = useRef(null);
	
	function handleChange(event){
		let value = event.target.value;
		let name = event.target.name;
		
		updateContent(prevValue => {
			if (name === 'title') {
				return (
					{
						title: value,
						content: prevValue.content
					}
				);
			} else if (name === 'content') {
				return (
					{
						title: prevValue.title,
						content: value
					}
				);
			}
		});
	}

	function addNote(event){
		if (fullNote.title !== '' && fullNote.content !== ''){
			axios.post('http://localhost:5000/createOrUpdate',
				{
					_id: fullNote.title,
					title: fullNote.title,
					content: fullNote.content
				}
			)
			.then(response => {
				axios.get('http://localhost:5000/allNotes')
					.then(res => props.updater(res.data))
					.catch(err => console.log(err));
				return response;
			})
			.catch(err => console.log(err));
			
			updateContent({ title: '', content: '' });
			titlePointer.current.focus();
		  document.querySelector('.bottom').scrollIntoView({behavior:"smooth"});
		}
	}

	return (
			<div className = 'fullPrompt'>
				<div className = 'promptContainer'>
					<input ref={titlePointer} onChange = {handleChange} name = 'title' className = 'promptTitle' type = 'text' placeholder = 'Title' value = {fullNote.title} />
					<textarea onChange = {handleChange} name = 'content' className = 'promptContent' placeholder = 'Note' value = {fullNote.content} />
				</div>
	
				<div className = 'addFab'>	
					<Fab onClick = {addNote} style ={{backgroundColor:'white',position:'absolute',bottom:'2%',right:'2%',height:'35px', width:'35px'}}> 
						<NoteAddIcon />
					</Fab>
				</div>
			</div>
	);
}
export default NotePrompt;

