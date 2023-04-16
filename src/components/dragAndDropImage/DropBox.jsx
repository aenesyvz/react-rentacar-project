import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const getColor = (props) => {
	if (props.isDragAccept) {
		return '#00e676';
	}
	if (props.isDragReject) {
		return '#ff1744';
	}
	if (props.isFocused) {
		return '#2196f3';
	}
	return ' hsl(var(152), 24%, 32%)';
};

const Container = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40px;
	border-width: 2px;
	border-radius: 10px;
	border-color: ${(props) => getColor(props)};
	border-style: dashed;
	background-color: #fafafa;
	color: black;
	font-weight: bold;
	font-size: 1.4rem;
	outline: none;
	transition: border 0.24s ease-in-out;
`;

function DropBox({ onDrop }) {
	const [imageSent, setImageSent] = useState([]);
	const uploadFiles = () => {
		const formData = new FormData();
		console.log(imageSent);
	};

	const handleFile = (e) => {
		setImageSent(e.target.files[0]);
	  };

	const {
		getRootProps,
		getInputProps,
		acceptedFiles,
		open,
		isDragAccept,
		isFocused,
		isDragReject,
	} = useDropzone({
		accept: 'image/*',
		onDrop,
		noClick: true,
		noKeyboard: true,
	});

	const lists = acceptedFiles.map((list) => (
		<li key={list.path}>
			{list.path} - {list.size} bytes
		</li>
	));
	return (
		<>
			{' '}
			<section className="dropbox">
				<Container
					className="dropbox"
					{...getRootProps({ isDragAccept, isFocused, isDragReject })}
				>
					<input {...getInputProps()} />
					<p>Dosyaları sürükle</p>
					<button type="button" className="select-file-btn" onClick={open}>
						Dosya Seçin
					</button>
				</Container>
			</section>
			<aside>
				<h4>List</h4>
				<p>{lists}</p>
			</aside>
			<input
				{...getInputProps({
					onChange: handleFile,
				})}
			/>
			<button className="upload-btn" onClick={() => uploadFiles()}>Upload Images</button>
		</>
	)
}

export default DropBox