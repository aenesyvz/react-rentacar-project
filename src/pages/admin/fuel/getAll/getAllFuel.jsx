import React, { useEffect, useState } from 'react'
import FuelService from "../../../../services/fuelService"
import { toast } from 'react-toastify';
import AddedFuel from '../add/addedFuel';
import UpdateFuel from '../update/updateFuel';
import AdminLayout from '../../../../layouts/admin/AdminLayout';

function GetAllFuel() {
  const [fuels, setFuels] = useState([]);
  const [OpenAddModal, setOpenAddModal] = useState(false);
  const [OpenUpdateModal, setOpenUpdateModal] = useState(false);
  const [SelectItem, setSelectItem] = useState(null);

  const getAll = async () => {
    const result = await new FuelService().getAll();
    setFuels(result.data);
    console.log(result.data);
  }

  useEffect(() => {
    getAll();
  }, []);

  

  const deleteItem = async (id) => {
    await new FuelService().delete(id).then((e)=>{
      toast.success("Yakıt siindi",{
        position:toast.POSITION.BOTTOM_RIGHT
      });
    }).catch((error)=>{
      toast.error(error.response.data.message,{
        position:toast.POSITION.BOTTOM_RIGHT
      });
    });
  }

  const redirectToUpdate = async(item) => {
    setSelectItem(item);
    setOpenUpdateModal(true);
  }

  return (
    <>
     <AdminLayout>
          <div className="content-header ">
            <i className='bx bx-menu header-icon' ></i>
            <span className="header-title">Tüm Yakıtlar</span>
          </div>
          <table className="content-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Adı</th>
                <th className='edit'>Düzenle</th>
              </tr>
            </thead>
            <tbody>
              {fuels.map(item => (
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

          <button className='add' onClick={() => setOpenAddModal(true)}>Ekle</button>
          </AdminLayout>

      <AddedFuel
        open={OpenAddModal}
        onClose={() => setOpenAddModal(false)}
        >
      </AddedFuel>

      {OpenUpdateModal && <UpdateFuel
        open={OpenUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        item={SelectItem}
      >
      </UpdateFuel>}
    </>
  )
}

export default GetAllFuel