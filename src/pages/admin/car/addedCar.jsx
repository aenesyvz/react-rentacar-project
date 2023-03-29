import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import BrandService from "../../../services/brandService"
import ModelService from "../../../services/modelService"
import ColorService from "../../../services/colorService"
import FuelService from "../../../services/fuelService"
import TransmissionService from "../../../services/transmissionService"
import CarService from "../../../services/carService"
import FormInput from "../../../components/formElements/formInput"
import FormSelect from "../../../components/formElements/formSelect"

function AddedCar() {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);
  const [fuels, setFuels] = useState([]);
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
    name: "",
    kilometer: 0,
    modelYear: 0,
    plate: "",
    carStateId: 0,
    minFindeksCreditRate: 0,
    motorPower: 0,
    torque: 0
  }

  const schema = Yup.object().shape({
    brandId: Yup.number().required(),
    name: Yup.string().required(),
    colorId: Yup.string().required(),
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
    const result = await new CarService().add({
      ...values
    })
  }

  return (
    <div>
      <div className='section container'>
        <div className='container grid'>
          <div className="content-header">
            <i className='bx bx-menu header-icon' ></i>
            <span className="header-title">Add Brand</span>
          </div>


          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={(values) => add(values)}
            >
              <Form>
                <FormInput name="name" type="text"></FormInput>
                <FormSelect
                  name="brandId"
                  options={brands.map((x) => ({
                    value: x.id,
                    label: x.name
                  }))}
                ></FormSelect>
                <FormSelect
                  name="modelId"
                  options={models.map((x) => ({
                    value: x.id,
                    label: x.name
                  }))}
                ></FormSelect>
                <FormSelect
                  name="colorId"
                  options={colors.map((x) => ({
                    value: x.id,
                    label: x.name
                  }))}
                ></FormSelect>
                <FormSelect
                  name="fuelId"
                  options={fuels.map((x) => ({
                    value: x.id,
                    label: x.name
                  }))}
                ></FormSelect>
                <FormSelect
                  name="transmissionId"
                  options={transmissions.map((x) => ({
                    value: x.id,
                    label: x.name
                  }))}
                ></FormSelect>
                <FormInput name="modelYear" type="text"></FormInput>
                <FormInput name="kilometer" type="text"></FormInput>
                <FormInput name="carStateId" type="text"></FormInput>
                <FormInput name="plate" type="text"></FormInput>
                <FormInput name="motorPower" type="text"></FormInput>
                <FormInput name="torque" type="text"></FormInput>
                <FormInput name="minFindeksCreditRate" type="text"></FormInput>
                <button className="add" type="submit">Ekle</button>
              </Form>
            </Formik>
          </div>

        </div>
      </div>
    </div>

  )
}

export default AddedCar