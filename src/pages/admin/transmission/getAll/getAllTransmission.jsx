import React, { useEffect, useState } from 'react'
import TransmissionService from "../../../../services/transmissionService"
import UpdateTransmission from "../update/updateTransmission"
import { toast } from 'react-toastify';
import AddedTransmission from '../add/addedTransmission';
import AdminLayout from "../../../../layouts/admin/AdminLayout"

function GetAllTransmission() {
    const [transmissions, setTransmissions] = useState([]);
    const [OpenAddModal, setOpenAddModal] = useState(false);
    const [OpenUpdateModal, setOpenUpdateModal] = useState(false);
    const [SelectItem, setSelectItem] = useState(null);

    const getAll = async () => {
        const result = await new TransmissionService().getAll();
        setTransmissions(result.data);
    }

    useEffect(() => {
        getAll();
    }, []);


    const deleteItem = async (id) => {
        await new TransmissionService().delete(id).then((e) => {
            toast.success("Vites silindi!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }).catch((error) => {
            toast.error(error.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        });
    }

    const redirectToUpdate = async(item)=>{
        setSelectItem(item);
        setOpenUpdateModal(true);
    }

    return (
        <>
            <AdminLayout>
                <div className="content-header">
                    <i className='bx bx-menu header-icon' ></i>
                    <span className="header-title">Tüm Vitesler</span>
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
                        {transmissions.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <div className="edit-btns">
                                        <button className='update' onClick={() => redirectToUpdate()}>Güncelle</button>

                                        <button className='delete' onClick={() => deleteItem(item.id)}>Sil</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className='add' onClick={() => setOpenAddModal(true)}>Ekle</button>
            </AdminLayout>

            <AddedTransmission
                open={OpenAddModal}
                onClose={() => setOpenAddModal(false)}
            ></AddedTransmission>

            {OpenUpdateModal && <UpdateTransmission
                open={OpenUpdateModal}
                onClsoe={() => setOpenUpdateModal(false)}
                item={SelectItem}
            >

            </UpdateTransmission>}
        </>
    )
}

export default GetAllTransmission