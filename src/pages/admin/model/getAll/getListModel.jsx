import React, { useEffect, useState } from 'react'
import ModelService from '../../../../services/modelService';
import AdminLayout from '../../../../layouts/admin/AdminLayout';
import { toast } from 'react-toastify';
import AddedModel from '../add/addedModel';
import UpdateModel from '../update/updateModel';

function GetListModel() {
    const [models, setModels] = useState([]);
    const [OpenAddModal, setOpenAddModal] = useState(false);
    const [OpenUpdateModal, setOpenUpdateModal] = useState(false);
    const [SelectItem, setSelectItem] = useState(null);

    const getAll = async () => {
        const result = await new ModelService().getAll();
        setModels(result.data);
    }

    useEffect(() => {
        getAll();
    }, []);



    const redirectToUpdate = (model) => {
       
    }

    const redirectToAdd = () => {
     
    }

    const deleteItem = async (id) => {
        await new ModelService().delete(id).then((e) =>{
            toast.success("Marka slindi",{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        }).catch((error)=>{
            toast.error(error.response.data.message,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        });
    }

    return (
        <>
            <AdminLayout>
                <div className="content-header">
                    <i className='bx bx-menu header-icon' ></i>
                    <span className="header-title">Tüm Modeller</span>
                </div>
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Marka Adı</th>
                            <th>Model Adı</th>
                            <th className='edit'>Düzenle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {models.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.brandName}</td>
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

                <button className='add' onClick={() => redirectToAdd()}>Ekle</button>


                <AddedModel
                    open={OpenAddModal}
                    onClose={()=>setOpenAddModal(false)}
                ></AddedModel>

                {OpenUpdateModal && <UpdateModel
                    open={OpenUpdateModal}
                    onClose={()=>setOpenUpdateModal(false)}
                    item={SelectItem}
                ></UpdateModel>}
            </AdminLayout>
        </>
    )
}

export default GetListModel