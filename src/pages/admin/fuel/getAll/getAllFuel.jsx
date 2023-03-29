import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FuelService from "../../../../services/fuelService"
function GetAllFuel() {
  const [fuels, setFuels] = useState([]);

  const getAll = async () => {
    const result = await new FuelService().getAll();
    setFuels(result.data);
    console.log(result.data);
  }

  useEffect(() => {
    getAll();
  }, []);

  let navigate = useNavigate();
  const redirectToAdd = () => {
    navigate("/admin/fuel/add");
  }

  const redirectToUpdate = (fuel) => {
    navigate("/admin/fuel/update", { state: { fuel } });
  }

  const deleteItem = async (id) => {
    const result = await new FuelService().delete(id);
  }

  return (
    <>
      <div className='section container'>
        <div className='container grid'>
          <div className="content-header container">
            <i className='bx bx-menu header-icon' ></i>
            <span className="header-title">Get All Fuel</span>
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

          <button className='add' onClick={() => redirectToAdd()}>Ekle</button>
        </div>
      </div>
    </>
  )
}

export default GetAllFuel