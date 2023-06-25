import React, { useEffect, useState } from 'react'
import CityService from '../../../../services/cityService';
import AdminLayout from '../../../../layouts/admin/AdminLayout';
import { toast } from 'react-toastify';
import "../styles.css"
import AddedCity from '../add/addedCity';
import UpdatedCity from '../update/updatedCity';
import GetListDistrict from '../../district/getList/getListDistrict';

function GetListCity() {
    const [cities, setCities] = useState([]);
    const [openAddModal, setopenAddModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [selectItem, setselectItem] = useState(null);

    const getAll = async () => {
        const result = await new CityService().getAll();
        setCities(result.data);
    }

    useEffect(() => {
        getAll();
    }, []);


    const deleteItem = async (id) => {
        await new CityService().delete(id).then((e) => {
            toast.success("İl silindi", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            getAll();
        }).catch((error) => {
            toast.error(error.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        })
    }

    const redirectToUpdate = (item) => {
        setselectItem(item);
        setOpenUpdateModal(true);
    }
    return (
        <>
            <AdminLayout>
                <div className="content-header">
                    <i className="bx bx-menu header-icon"></i>
                    <span className="header-title">Tüm İller</span>
                </div>
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Plaka Kodu</th>
                            <th>İl Adı</th>
                            <th className='edit'>Düzenle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.plateCode}</td>
                                <td>{item.name}</td>
                                <td>
                                    <div className="edit-btns">
                                        <button className='update' onClick={() => redirectToUpdate(item)}>Güncelle</button>
                                        <button className='delete' onClick={() => deleteItem(item.id)}>Sil</button>
                                        <button className='add' onClick={() => GetListDistrict(item.id,item.name)}>İlçeler</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='add' onClick={() => setopenAddModal(true)}>Ekle</button>
            </AdminLayout>

            <AddedCity
                open={openAddModal}
                onClose={() => setopenAddModal(false)}
                getAll={() => getAll()}
            ></AddedCity>

            {openUpdateModal && <UpdatedCity
                  open={openUpdateModal}
                  onClose={() => setOpenUpdateModal(false)}
                  item={selectItem}
                  getAll={() => getAll()}
            ></UpdatedCity>}
        </>
    )
}

export default GetListCity