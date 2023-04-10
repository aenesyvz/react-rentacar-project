import React from 'react'
import "../modal/styles.css"
const Modal = ({ children,...props}) => {
    if (!props.open) return null;

 
    return (
        <>
          <div className="modal" onClick={(e) => {
            e.stopPropagation();
          }}>
            
          <div className="overlay" >
            <div className="x-button" onClick={props.onClose}>
                <div className="line line-1"></div>
                <div className="line line-2"></div>
            </div>
                <div className="modalContainer">
                    <h2 className='e'>E</h2>
                    {children}
                </div>
            </div>
          </div>

       

        </>
    );
}; 



export default Modal;