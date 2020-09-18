import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

function Note(props) {
	

	return(
		<div className = 'noteContainer'>
			
			<h2>{props.title}  </h2>
			<hr />
			<p> {props.content} </p>

			<button className='delButton' onClick={() => props.delete(props.title)}>
				<DeleteIcon />
			</button>

		</div>
	)
}

export default Note;