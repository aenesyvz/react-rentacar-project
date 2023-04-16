import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../../layouts/admin/AdminLayout'
import StaffService from "../../../../services/staffService"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function GetAllStaff() {
    const [staffs, setStaffs] = useState([]);
   

    const getAll = async() => {
        await new StaffService().getAll().then((e) => {
            setStaffs(e.data);
        }).catch((error) => {
            toast.error("Veriler getirilemedi", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        });
    }

    useEffect(() => {
      getAll(); 
    }, []);

    let navigate = useNavigate();
    const redirectToUpdate = (model) => {
        navigate("/admin/staff/update",{state:{model}});
    }

    const redirectToAdd = () => {
        navigate("/admin/staff/add");
    }


    const deleteItem = async(id) => {
        await new StaffService().delete(id).then((e) => {
            toast.success("Personel silidi",{
                position:toast.POSITION.BOTTOM_RIGHT
            });
        }).catch((error)=>{
            toast.error(error.response.data.message)
        })
    }

  
    return (
        <>
            <AdminLayout>
                <div className="content-header">
                    <i className='bx bx-menu header-icon' ></i>
                    <span className="header-title">Tüm Personeller</span>
                </div>
                <table className='content-table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Adı</th>
                            <th>Soyad</th>
                            <th>Email</th>
                            <th className='edit'>Düzenle</th>
                        
                        </tr>
                       
                    </thead>
                    <tbody>
                            {staffs.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>
                                    <div className="edit-btns">
                                        <button className='update' onClick={() =>redirectToUpdate(item) }>Güncelle</button>

                                        <button className='delete' onClick={() => deleteItem(item.id)}>Sil</button>
                                    </div>
                                </td>
                                </tr>
                            )}
                        </tbody>
                </table>

                <button className='add' onClick={() => redirectToAdd()}>Ekle</button>
            </AdminLayout>
            
           
            

        </>

    )
}
