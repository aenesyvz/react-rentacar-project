import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TransmissionService from "../../../../services/transmissionService"
import "../../../admin/styles.css"
function GetAllTransmission() {
    const [transmissions, setTransmissions] = useState([]);

    const getAll = async () => {
        const result = await new TransmissionService().getAll();
        setTransmissions(result.data);
    }

    useEffect(() => {
        getAll();
    }, []);

    let navigate = useNavigate();
    const redirectToAdd = () => {
        navigate("/admin/transmission/add");
    }

    const redirectToUpdate = (transmission) => {
        navigate("/admin/transmission/update", { state: { transmission } });
    }

    const deleteItem = async (id) => {
        const result = await new TransmissionService().delete(id);
    }
    return (
        <>
            <div className='section container'>
                <div className='container grid'>
                    <div className="content-header container">
                        <i className='bx bx-menu header-icon' ></i>
                        <span className="header-title">Get All Transmission</span>
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
                            {transmissions.map((item) => (
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

                    <button className='add' onClick={() => redirectToAdd()}>Ekle</button>
                </div>
            </div>
        </>
    )
}

export default GetAllTransmission