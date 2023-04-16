import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import GetListBrand from "./pages/admin/brand/getAll/getListBrand"
import GetListModel from "./pages/admin/model/getAll/getListModel";
import GetAllTransmission from './pages/admin/transmission/getAll/getAllTransmission';
import GetAllFuel from './pages/admin/fuel/getAll/getAllFuel';
import GetAllColor from "./pages/admin/color/getAll/getAllColor"
import GetAllStaff from "./pages/admin/staffs/getAll/getAllStaff"
import IndexPage from "./pages/website/index"
import AddedStaff from './pages/admin/staffs/add/addedStaff';
import UpdateStaff from './pages/admin/staffs/update/updateStaff';
import AddedCar from './pages/admin/car/add/addedCar';

function App() {
  return (
    <div className="App">
      <Router >
        <Routes > 
        <Route exact path='/' element={<IndexPage></IndexPage>}></Route>
          <Route exact path='/admin/brand/getList' element={<GetListBrand></GetListBrand>}></Route>
          <Route exact path='/admin/model/getList' element={<GetListModel></GetListModel>}></Route>
          <Route exact path='/admin/transmission/getList' element={<GetAllTransmission></GetAllTransmission>}></Route>
          <Route exact path='/admin/fuel/getList' element={<GetAllFuel></GetAllFuel>}></Route>
          <Route exact path='/admin/color/getList' element={<GetAllColor></GetAllColor>}></Route>

          //Staff
          <Route exact path='/admin/staffs/getList' element={<GetAllStaff></GetAllStaff>}></Route>
          <Route exact path='/admin/staff/add' element={<AddedStaff></AddedStaff>}></Route>
          <Route exact path='/admin/staff/update' element={<UpdateStaff></UpdateStaff>}></Route>
          //Car
          {/* <Route exact path='/admin/car/getList' element={<GetAllCar></GetAllCar>}></Route> */}
          <Route exact path='/admin/car/add' element={<AddedCar></AddedCar>}></Route>
          //<Route exact path='/admin/staff/update' element={<UpdateStaff></UpdateStaff>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
