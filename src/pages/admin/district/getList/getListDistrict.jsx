import React from 'react'
import DistrictService from '../../../../services/districtService';
import AdminLayout from '../../../../layouts/admin/AdminLayout';

function GetListDistrict({cityId,cityName}) {
    const [districts, setDistricts] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [selectItem, setSelectItem] = useState(null);

    const getAll = async() => {
        const result = await new DistrictService().getAll(cityId);
        setDistricts(result.data);
    }

    useEffect(() => {
      getAll();
    }, [])
    const deleteItem = async (id) => {
        await new DistrictService().delete(id).then((e) => {
          toast.success("İlçesi silindi", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
          getAll();
        }).catch((error) => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
        })
      }
    
  const redirectToUpdate = (item) => {
    setSelectItem(item);
    setOpenUpdateModal(true);
  }
  return (
    <>
         <AdminLayout>
        <div className="content-header">
          <i className='bx bx-menu header-icon' ></i>
          <span className="header-title">{cityName} Şehrine Ait Tüm İlçeler</span>
        </div>
        <table className="content-table">
          <thead>
            <tr>
              <th>#</th>
              <th>İlçe Ad</th>
              <th className='edit'>Düzenle</th>
            </tr>
          </thead>
          <tbody>
            {districts.map((item) => (
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
      <AddedBrand
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        getAll={() => getAll()}
      ></AddedBrand>

      {openUpdateModal && <UpdatedBrand
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        item={selectItem}
        getAll={() => getAll()}
      ></UpdatedBrand>}
    </>
  )
}

export default GetListDistrict