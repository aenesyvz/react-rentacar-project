import React, { useState, useEffect, useRef, useContext } from 'react';
import "./styles.css"
import { CarImageContext } from '../../pages/admin/car/add/addedCar';
import AssetModal from '../modal/assetModal';

const Dropzone = () => {
    const [openModal, setopenModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const fileInputRef = useRef();
    const { selectedFiles, setSelectedFiles } = useContext(CarImageContext);
    const [url, setUrl] = useState(null);
    const [selectImage,setSelectImage] = useState(null);

    const handleModal = (item) => {
        setSelectImage(item);
        setopenModal(true);

    }

    const handleFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                setErrorMessage(null);
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
               
            } else {
                setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
                setErrorMessage('File type not permitted');
            }
        }
    }

    const removeFile = (name) => {

        const selectedFileIndex = selectedFiles.findIndex(e => e.name === name);
        selectedFiles.splice(selectedFileIndex, 1);

        setSelectedFiles([...selectedFiles]);

        const unsupportedFileIndex = unsupportedFiles.findIndex(e => e.name === name);
        if (unsupportedFileIndex !== -1) {
            unsupportedFiles.splice(unsupportedFileIndex, 1);
            setUnsupportedFiles([...unsupportedFiles]);
        }
    }

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    }

    const fileSize = (size) => {
        if (size === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const filesSelected = () => {
        if (fileInputRef.current.files.length) {

            console.log(fileInputRef.current.files);
            handleFiles(fileInputRef.current.files);
        }
    }

    const dragOver = (e) => {
        e.preventDefault();
    }

    const dragEnter = (e) => {
        e.preventDefault();
    }

    const dragLeave = (e) => {
        e.preventDefault();
    }

    const fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    }

    return (
        <>
              <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'></link>
        <div className='dropzone'>
            <div className="drap__drop__container"
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={fileDrop}
            >
                <p>Lütfen .jpeg .jpg veya .png uzantılı dosyalar yükleyiniz.</p>
                {errorMessage == null ? "" : <p className='file-error-message'>{errorMessage}</p>}
                <div className="drop-message" onClick={fileInputClicked}>
                    <div className="select-file-btn">Dosya Seçin</div>

                    <input
                        ref={fileInputRef}
                        className="file-input"
                        type="file"
                        multiple
                        onChange={filesSelected}
                    />
                </div>
            </div>
            <div className=" drag__content">
                {
                    selectedFiles.map((data, i) =>

                        <div  className='drag__img' >
                      
                                {<img key={i} src={URL.createObjectURL(data)} />}

                                <div className="img__wrapper">
                                 <div className="operation">
                                      <i class='bx bx-trash icon' onClick={()=>removeFile(data.name)}></i>
                                <i class='bx bx-image icon' onClick={()=>handleModal(data)}></i>
                                 </div>
                              
                                </div>
                            {/* <div className="file-remove" onClick={() => removeFile(data.name)}>X</div> */}
                        </div>
            
                    )
                }
             
            </div>
        </div>
        { openModal && <AssetModal 
            open={openModal} onClose={() => setopenModal(false)}
        >
            <img src={URL.createObjectURL(selectImage)}></img> 
        </AssetModal>}
        </>
    )   
}
export default Dropzone;