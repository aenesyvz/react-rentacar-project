import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import BrandService from "../../../../services/brandService"
import FormInput from "../../../../components/formElements/formInput"
import FormSelect from "../../../../components/formElements/formSelect"
import { useNavigate } from 'react-router-dom'
import ModelService from '../../../../services/modelService'

function AddedModel() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);

  const getAllBrands = async () => {
    const result = await new BrandService().getAll();
    setBrands(result.data);
  }

  useEffect(() => {
    getAllBrands();
  }, []);


  const initialValues = {
    name: "",
  }

  const schema = Yup.object().shape({
    brandId: Yup.number().required(),
    name: Yup.string().required()
  });

  const add = async (values) => {
    const result = await new ModelService().add({
      ...values
    });
    navigate(-1);
  }

  return (
    <div>
      <div className='section container'>
        <div className='container grid'>
          <div className="content-header">
            <i className='bx bx-menu header-icon' ></i>
            <span className="header-title">Add Model</span>
          </div>

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
              <button className="add" type="submit">Ekle</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default AddedModel