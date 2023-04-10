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
import Modal from '../../../components/modal/modal'

function AddedCar({open,onClose}) {
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
          <Modal open={open} onClose={onClose}>
            <h2 className="modal-title">Marka Ekle</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={(values) => add(values)}
            >
              <Form>
                <FormInput name="name" type="text"></FormInput>
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
                <FormInput label="Minimum Findeks Oranı"  name="minFindeksCreditRate" type="text"></FormInput>
                <button className="add" type="submit">Ekle</button>
              </Form>
            </Formik>
            </Modal>

  )
}

export default AddedCar