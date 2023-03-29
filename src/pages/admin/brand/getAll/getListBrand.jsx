import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BrandService from '../../../../services/brandService';
import "./getListBrand.css"
import "../styles.css"

function GetListBrand() {
  const [brands, setBrands] = useState([]);

  const getAll = async() => {
    const result = await new BrandService().getAll();
    setBrands(result.data);
  }

  useEffect(() => {
   getAll();
  }, []);

  const deleteItem = async(id) => {
    const result = await new BrandService().delete(id);
  }
  

  let navigate = useNavigate();
  const redirectToAdd = () => {
    navigate("/admin/brand/add");
  }

  const redirectToUpdate = (brand) =>{
    navigate("/admin/brand/update",{state:{brand}});
  }

  return (
     
    <>
      <div className='section container'>
        <div className='container grid'>
      <div className="content-header container">
        <i className='bx bx-menu header-icon' ></i>
        <span className="header-title">Get All Brand</span>
      </div>
      <table className="content-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Marka İsmi</th>
            <th className='edit'>Düzenle</th>
          </tr>
        </thead>
        <tbody>
        {brands.map((item) => (
           <tr key={item.id}>
           <td>{item.id}</td>
           <td>{item.name}</td>
           <td>
             <div className="edit-btns">
               <button className='update' onClick={() => redirectToUpdate(item)}>Güncelle</button>
  
               <button className='delete' onClick={() => deleteItem(item.id)}>Sil</button>
             </div>
           </td>
         </tr>
          ))}
    
        </tbody>
      </table>

      <button className='add' onClick={()=> redirectToAdd()}>Ekle</button>
      </div>
      </div>
    </>
  )
}

export default GetListBrand