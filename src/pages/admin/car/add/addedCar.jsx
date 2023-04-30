import React, { createContext, useEffect, useState } from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import BrandService from "../../../../services/brandService"
import ModelService from "../../../../services/modelService"
import ColorService from "../../../../services/colorService"
import FuelService from "../../../../services/fuelService"
import TransmissionService from "../../../../services/transmissionService"
import CarService from "../../../../services/carService"
import FormInput from "../../../../components/formElements/formInput"
import FormSelect from "../../../../components/formElements/formSelect"
import AdminLayout from '../../../../layouts/admin/AdminLayout'
import { toast } from 'react-toastify'
import Dropzone  from '../../../../components/dragAndDropImage/Dropzone'
import DragAndDrop from '../../../../components/dragAndDropImage/DragAndDrop'




export const CarImageContext = createContext();

function AddedCar() {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [transmissions, setTransmissions] = useState([]);


  const getAllBrands = async () => {
    const result = await new BrandService().getAll();
    setBrands(result.data);
  }

  const getAllColors = async () => {
    const result = await new ColorService().getAll();
    setColors(result.data);
  }

  const getAllModels = async () => {
    const result = await new ModelService().getAll();
    setModels(result.data);
  }

  const getAllFuels = async () => {
    const result = await new FuelService().getAll();
    setFuels(result.data);
  }

  const getAllTransmissions = async () => {
    const result = await new TransmissionService().getAll();
    setTransmissions(result.data);
  }

  useEffect(() => {
    getAllBrands();
    getAllModels();
    getAllColors();
    getAllTransmissions();
    getAllFuels();
  }, []);


  const initialValues = {
    brandId: "",
    name: "",
    colorId: "",
    modelId: "",
    kilometer: 0,
    modelYear: "",
    plate: "",
    transmissionId: "",
    fuelId: "",
    carStateId: "",
    minFindeksCreditRate: 0,
    motorPower: "",
    torque: ""
  }

  const schema = Yup.object().shape({
    brandId: Yup.number().required(),
    name: Yup.string().required(),
    colorId: Yup.number().required(),
    modelId: Yup.number().required(),
    kilometer: Yup.number().required(),
    modelYear: Yup.number().required(),
    plate: Yup.string().required(),
    transmissionId: Yup.number().required(),
    fuelId: Yup.number().required(),
    carStateId: Yup.number().required(),
    minFindeksCreditRate: Yup.number().required(),
    motorPower: Yup.number().required(),
    torque: Yup.number().required()
  })

  const add = async (values) => {
    await new CarService().add({
      ...values
    }).then((e)=>{
      toast.success("Araba eklendi",{
        position:toast.POSITION.BOTTOM_RIGHT,
        
      })
    }).catch((error)=>{
      toast.error(error.response.data.message,{
        position:toast.POSITION.BOTTOM_RIGHT
      })
    });
    selectedFiles.forEach(element => {
      
      console.log(URL.createObjectURL(element));
    });
  }

  return (
    <AdminLayout>
      
      <div className="content-header">
        <i className='bx bx-menu header-icon' ></i>
        <span className="header-title">Araba Ekle</span>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => add(values)}
      >
        <Form>
          <div className="form__content">
            <FormInput name="name" type="text" label="Ad"></FormInput>
            <FormSelect
              label="Marka"
              name="brandId"
              options={brands.map((x) => ({
                value: x.id,
                label: x.name
              }))}
            ></FormSelect>
            <FormSelect
              label="Model"
              name="modelId"
              options={models.map((x) => ({
                value: x.id,
                label: x.name
              }))}
            ></FormSelect>
            <FormSelect
              label="Renk"
              name="colorId"
              options={colors.map((x) => ({
                value: x.id,
                label: x.name
              }))}
            ></FormSelect>
            <FormSelect
              label="Yakıt"
              name="fuelId"
              options={fuels.map((x) => ({
                value: x.id,
                label: x.name
              }))}
            ></FormSelect>
            <FormSelect
              label="Vites"
              name="transmissionId"
              options={transmissions.map((x) => ({
                value: x.id,
                label: x.name
              }))}
            ></FormSelect>
            <FormInput label="Model Yılı" name="modelYear" type="text"></FormInput>
            <FormInput label="KM" name="kilometer" type="text"></FormInput>
            <FormInput label="Araç Durumu" name="carStateId" type="text"></FormInput>
            <FormInput label="Plaka" name="plate" type="text"></FormInput>
            <FormInput label="Motor Gücü" name="motorPower" type="text"></FormInput>
            <FormInput label="Tork" name="torque" type="text"></FormInput>
            <FormInput label="Minimum Findeks Oranı" name="minFindeksCreditRate" type="text"></FormInput>
          </div>
          <CarImageContext.Provider value={{selectedFiles, setSelectedFiles}}>
             <Dropzone />
          </CarImageContext.Provider>
        
          <button className="add" type="submit">Ekle</button>
        </Form>
      </Formik>
     
    </AdminLayout>

  )
}

export default AddedCar