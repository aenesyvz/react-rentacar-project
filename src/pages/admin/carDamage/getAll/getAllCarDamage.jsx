import React from 'react'
import { useLocation ,useNavigate} from 'react-router-dom';
import CarDamageService from '../../../../services/carDamageService';

function GetAllCarDamageByCarId() {
    const location = useLocation();
  

    const [carDamages, setcarDamages] = useState([]);

    const getAllByCarId = async() => {
        const result = await CarDamageService.getByCarId(location.state.carId);
        setcarDamages(result.data);
    }

    useEffect(() => {
     // getAllByCarId
    }, []);

    let navigate = useNavigate();
    const redirectToAdd = () => {
      navigate("/admin/carDamage/add");
    }
    
    const redirectToUpdate = (item) => {
      navigate("/admin/carDamage/update",{state:{item}});
    }

    const deleteItem = async(id) => {
      const result = await CarDamageService.delete(id);
    }

  return (
    <>

    <div className="content-header container">
      <i className='bx bx-menu header-icon' ></i>
      <span className="header-title">Get All Car Damage By Car Id</span>
    </div>
    <table className="content-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Description</th>
          <th>Fix</th>
          <th className='edit'>Düzenle</th>
        </tr>
      </thead>
      <tbody>
       {carDamages.map(item =>{
         <tr key={item.id}>
         <td>{item.id}</td>
         <td>{item.damageDescription}</td>
         <td>{item.isFixed ? "Tamir Edildi":"Tamir Edilmedi"}</td>
         <td>
           <div className="edit-btns">
             <button className='update' onClick={() => redirectToUpdate(item)}>Güncelle</button>

             <button className='delete' onClick={() => deleteItem(item.id)}>Sil</button>
           </div>
         </td>
       </tr>
       })}
      </tbody>
    </table>

    <button className='add' onClick={() => redirectToAdd()}>Ekle</button>

  </>
  )
}

export default GetAllCarDamageByCarId