import React from 'react'
import "../modal/styles.css"
const AssetModal = ({ children,...props}) => {
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
                <div className="assetModalContainer">
                    {children}
                </div>
            </div>
          </div>

       

        </>
    );
}; 



export default AssetModal;