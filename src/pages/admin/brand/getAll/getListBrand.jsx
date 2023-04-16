import React, { useEffect, useState } from 'react'
import BrandService from '../../../../services/brandService';
import "./getListBrand.css"
import "../styles.css"
import AddedBrand from '../add/addedBrand';
import UpdatedBrand from '../update/updatedBrand';
import { toast } from 'react-toastify';
import AdminLayout from '../../../../layouts/admin/AdminLayout';

function GetListBrand() {
  const [brands, setBrands] = useState([]);
  const [openAddModal, setopenAddModal] = useState(false);
  const [openUpdateModal, setopenUpdateModal] = useState(false);
  const [selectItem, setSelectItem] = useState(null);

  const getAll = async () => {
    const result = await new BrandService().getAll();
    setBrands(result.data);
  }

  useEffect(() => {
    getAll();
  }, []);

  const deleteItem = async (id) => {
    await new BrandService().delete(id).then((e) => {
      toast.success("Marka silindi!");
    }).catch((error) => {
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
  }



  const redirectToUpdate = (item) => {
    setSelectItem(item);
    setopenUpdateModal(true);
  }


  return (

    <>
      <AdminLayout>
        <div className="content-header">
          <i className='bx bx-menu header-icon' ></i>
          <span className="header-title">Tüm Markalar</span>
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

        <button className='add' onClick={() => setopenAddModal(true)}>Ekle</button>

      </AdminLayout>
      <AddedBrand
        open={openAddModal}
        onClose={() => setopenAddModal(false)}
      ></AddedBrand>

      {openUpdateModal && <UpdatedBrand
        open={openUpdateModal}
        onClose={() => setopenUpdateModal(false)}
        item={selectItem}
      ></UpdatedBrand>}
    </>
  )
}

export default GetListBrand