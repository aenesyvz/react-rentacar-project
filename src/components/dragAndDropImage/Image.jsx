import React from 'react'
import "./styles.css"
function Image({ image }) {
    return (
		<div>
			<img className='drag__img' alt='' src={image.src} />
		</div>
	);
}

export default Image