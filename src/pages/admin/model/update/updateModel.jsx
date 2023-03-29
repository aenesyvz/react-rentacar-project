import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ModelService from '../../../../services/modelService';
import * as Yup from "yup"
import { Form, Formik } from "formik"
import FormInput from '../../../../components/formElements/formInput';
import FormSelect from '../../../../components/formElements/formSelect';
import BrandService from '../../../../services/brandService';

function UpdateModel() {
    const location = useLocation();
    const initialValues = {
        id:location.state.item.model.id,
        name:location.state.model.name,
        brandId:location.state.model.brandId
    }
    const schema = Yup.object().shape({
        name: Yup.string().required("İsim alanı boş geçilemez").min(3).required("İsim en az üç karakterli olmalıdır")
    });


    const [brands, setbrands] = useState([]);

    const getAllBrand = async() => {
      const result = await new BrandService().getAll();
      setbrands(result.data);
    }
    const update = async(values) => {
        const result = await ModelService.update({
            ...values
        });
    }

  return (
    <div>
    <div className='section container'>
      <div className='container grid'>
        <div className="content-header">
          <i className='bx bx-menu header-icon' ></i>
          <span className="header-title">Update Model</span>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values) => update(values)}
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
            <button className="add" type="submit">Güncelle</button>
          </Form>
        </Formik>
      </div>
    </div>
  </div>
  )
}

export default UpdateModel