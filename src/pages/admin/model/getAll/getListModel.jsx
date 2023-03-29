import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ModelService from '../../../../services/modelService';

function GetListModel() {
    const [models, setModels] = useState([]);

    const getAll = async() => {
        const result = await new ModelService().getAll();
        setModels(result.data);
    }

    useEffect(() => {
      getAll();
    
    
    }, []);


    let navigate = useNavigate();
    const redirectToUpdate = (model) => {
        navigate("/admin/model/update",{state:{model}});
    }

    const redirectToAdd = () => {
        navigate("/admin/model/add");
    }

    const deleteItem = async(id) => {
        const result = await new ModelService().delete(id);
    }
    
    return (
        <>
            <div className='section container'>
                <div className='container grid'>
                    <div className="content-header container">
                        <i className='bx bx-menu header-icon' ></i>
                        <span className="header-title">Get All Model</span>
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
                </div>
            </div>
        </>
    )
}

export default GetListModel