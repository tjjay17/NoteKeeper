import React,{useState,useEffect} from 'react';
import Header from './Header';
import Prompt from './Prompt';
import Footer from './Footer';
import Note from './Note';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import Spinner from './Spinner';


function App() {
	//useSpring way to set up animation
	const props = useSpring({ opacity: 1, from: { opacity: 0 } });
	const [notes, updateNotes] = useState([]);
	const [loading, updateLoading] = useState(false);
	
	useEffect(() => {
		axios.get('http://localhost:5000/allNotes')
			.then(res => {
				updateLoading(true);
				updateNotes(res.data);

			})
			.catch(err => console.log(err));
	}, []);

	function globalUpdater(data) {
		updateNotes(data);
	}

	function deleteNote(title) {
		axios.delete('http://localhost:5000/noteToDelete/' + title)
			.then(res => res)
			.catch(err => console.log(err));

		axios.get('http://localhost:5000/allNotes').then(res => updateNotes(res.data)).catch(err => console.log(err));
	}

	let loadedApp = <Spinner />;
	if (loading) {
		loadedApp = (
			<div style={{ height: '100vh' }}>
				<Prompt notes={notes} updater={globalUpdater} />
					<animated.div style={props} className='allNotes'>
						{notes.map((eachNote, index) => <Note key={index} delete={deleteNote} title={eachNote.Title} content={eachNote.Content} />)}
					</animated.div>
				<Footer />
			</div>
		);
	}

	return (
		<div>
			<Header />
			{loadedApp}
		</div>
	);
}
export default App;

		
