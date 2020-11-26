import React from 'react';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';

function header(){
	return (
		<div className='titleContainer'>
			<h1 className='header'> <WbIncandescentIcon style={{ position: 'relative', top: '4px' }} /> Note Keeper </h1>
		</div>
	);
}
export default header;