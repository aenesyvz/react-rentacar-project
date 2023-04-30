import React, { useEffect, useState } from 'react'
import ColorService from '../../../../services/colorService';
import AddedColor from '../add/addedColor';
import UpdateColor from '../update/updateColor';
import AdminLayout from '../../../../layouts/admin/AdminLayout';
import { ToastContainer, toast } from 'react-toastify';
function GetAllColor() {
  const [colors, setColors] = useState([]);
  const [openAddModal, setopenAddModal] = useState(false);
  const [openUpdateModal, setopenUpdateModal] = useState(false);
  const [selectItem, setselectItem] = useState(null);

  const getAll = async() => {
    const result = await new ColorService().getAll();
    setColors(result.data);
  }
  
  useEffect(() => {
    getAll();
   }, []);


 
  const deleteItem = async (id) => {
    await new ColorService().delete(id).then((e) => {
      toast.success("Renk silindi!",{
        position:toast.POSITION.BOTTOM_RIGHT
      })
    }).catch((error)=> {
      toast.error(error.response.data.message,{
        position:toast.POSITION.BOTTOM_RIGHT
      })
    });
  }

  const redirectToUpdate = async(item) => {
    setselectItem(item);
    setopenUpdateModal(true)
  }
  return (
    <>
      <AdminLayout>
          <div className="content-header container">
            <i className='bx bx-menu header-icon' ></i>
            <span className="header-title">Tüm Renkler</span>
          </div>
          <table className="content-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Ad</th>
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
          </AdminLayout>

      <AddedColor 
        open={openAddModal}
        onClose={() => setopenAddModal(false)}
       getAll={()=>getAll()}
      >  
      </AddedColor>

      {openUpdateModal && <UpdateColor
        open={openUpdateModal}
        onClose={() => setopenUpdateModal(false)}
        item={selectItem}
        getAll={()=>getAll()}
        >
      </UpdateColor>}

      <ToastContainer></ToastContainer>
    </>
  )
}

export default GetAllColor