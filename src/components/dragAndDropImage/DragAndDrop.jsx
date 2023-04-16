import React, { useCallback, useState } from 'react';
import DropBox from './DropBox';
import ShowImage from './ShowImage';

export default function DragAndDrop() {
    const [images, setImages] = useState([]);

	const onDrop = useCallback((acceptedFiles) => {
		acceptedFiles.map((file, index) => {
			const reader = new FileReader();

			reader.onload = function (e) {
				setImages((prevState) => [
					...prevState,
					{ id: index, src: e.target.result },
				]);
			};

			reader.readAsDataURL(file);
			return file;
		});
	}, []);

	return (
		<div className="drap__drop__container">
			<DropBox onDrop={onDrop} />
			<ShowImage images={images} />
		</div>
	);
}
