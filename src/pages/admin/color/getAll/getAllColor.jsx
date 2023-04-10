import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ColorService from '../../../../services/colorService';
import BrandService from '../../../../services/brandService';
import AddedColor from '../add/addedColor';
function GetAllColor() {
  const [colors, setColors] = useState([]);
  const [openAddModal, setopenAddModal] = useState(false);
  const getAll = async() => {
    const result = await new ColorService().getAll();
    setColors(result.data);
    console.log(colors);
  }
  
  useEffect(() => {
    getAll();
   }, []);

  let navigate = useNavigate();
  const redirectToAdd = () => {
    navigate("/admin/color/add");
  }

  const redirectToUpdate = (item) => {
    navigate("/admin/color/update", { state: { item } });
  }

  const deleteItem = async (id) => {
    const result = await new ColorService().delete(id);
  }

  return (
    <>
      <div className='section container'>
        <div className='container grid'>
          <div className="content-header container">
            <i className='bx bx-menu header-icon' ></i>
            <span className="header-title">Get All Color</span>
          </div>
          <table className="content-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th className='edit'>Düzenle</th>
              </tr>
            </thead>
            <tbody>
            {colors.map((item) => (
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

          <button className='add' onClick={() => setopenAddModal(true)}>Ekle</button>
        </div>
      </div>

      <AddedColor 
        open={openAddModal}
        onClose={() => setopenAddModal(false)}>  
      </AddedColor>
    </>
  )
}

export default GetAllColor