import logo from './logo.svg';
import './App.css';
import Sidebar from './components/sidebar/sidebar';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Brand
import GetListBrand from "./pages/admin/brand/getAll/getListBrand"
import AddBrand from "./pages/admin/brand/add/addedBrand"
import UpdatedBrand from './pages/admin/brand/update/updatedBrand';

// Model
import GetListModel from "./pages/admin/model/getAll/getListModel";
import AddModel from "./pages/admin/model/add/addedModel";
import UpdatedModel from "./pages/admin/model/update/updateModel"

//Transmission
import GetAllTransmission from './pages/admin/transmission/getAll/getAllTransmission';
import AddedTransmission from './pages/admin/transmission/add/addedTransmission';
import UpdateTransmission from './pages/admin/transmission/update/updateTransmission';

// Fuel
import UpdateFuel from './pages/admin/fuel/update/updateFuel';
import AddedFuel from './pages/admin/fuel/add/addedFuel';
import GetAllFuel from './pages/admin/fuel/getAll/getAllFuel';

// Color 
import AddedColor from './pages/admin/color/add/addedColor';
import UpdateColor from './pages/admin/color/update/updateColor';
import GetAllColor from "./pages/admin/color/getAll/getAllColor"

//Index
import IndexPage from "./pages/website/index"

function App() {
  return (
    <div className="App">
      <Router >
        {/* <Sidebar></Sidebar> */}
        <Routes > 
        <Route exact path='/' element={<IndexPage></IndexPage>}></Route>
          {/* Brand */}
          <Route exact path='/admin/brand/add' element={<AddBrand></AddBrand>}></Route>
          <Route exact path='/admin/brand/update' element={<UpdatedBrand></UpdatedBrand>}></Route>
          <Route exact path='/admin/brand/getList' element={<GetListBrand></GetListBrand>}></Route>

          {/* Model */}
          <Route exact path='/admin/model/add' element={<AddModel></AddModel>}></Route>
          <Route exact path='/admin/model/update' element={<UpdatedModel></UpdatedModel>}></Route>
          <Route exact path='/admin/model/getList' element={<GetListModel></GetListModel>}></Route>

          {/* Transmission */}
          <Route exact path='/admin/transmission/add' element={<AddedTransmission></AddedTransmission>}></Route>
          <Route exact path='/admin/transmission/update' element={<UpdateTransmission></UpdateTransmission>}></Route>
          <Route exact path='/admin/transmission/getList' element={<GetAllTransmission></GetAllTransmission>}></Route>

          {/* Fuel */}
          <Route exact path='/admin/fuel/add' element={<AddedFuel></AddedFuel>}></Route>
          <Route exact path='/admin/fuel/update' element={<UpdateFuel></UpdateFuel>}></Route>
          <Route exact path='/admin/fuel/getList' element={<GetAllFuel></GetAllFuel>}></Route>

          {/* Color */}
          <Route exact path='/admin/color/add' element={<AddedColor></AddedColor>}></Route>
          <Route exact path='/admin/color/update' element={<UpdateColor></UpdateColor>}></Route>
          <Route exact path='/admin/color/getList' element={<GetAllColor></GetAllColor>}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
