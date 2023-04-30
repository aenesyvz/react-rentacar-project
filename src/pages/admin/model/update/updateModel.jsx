import React, { useState } from 'react'
import ModelService from '../../../../services/modelService';
import * as Yup from "yup"
import { Form, Formik } from "formik"
import FormInput from '../../../../components/formElements/formInput';
import FormSelect from '../../../../components/formElements/formSelect';
import BrandService from '../../../../services/brandService';
import Modal from '../../../../components/modal/modal';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function UpdateModel({ open, onClose, item, getAll }) {

  const [brands, setbrands] = useState([]);

  const getAllBrand = async () => {
    const result = await new BrandService().getAll();
    setbrands(result.data);
  }

  useEffect(() => {
    getAllBrand();
  }, []);

  const initialValues = {
    id: item.id,
    name: item.name,
    brandId: item.brandId
  }

  const schema = Yup.object().shape({
    name: Yup.string().required("İsim alanı boş geçilemez").min(3).required("İsim en az üç karakterli olmalıdır")
  });



  const update = async (values) => {
    await new ModelService.update({
      ...values
    }).then((e) => {
      toast.success("Marka güncellendi", {
        position: toast.POSITION.BOTTOM_RIGHT
      })
      getAll();
      onClose();
    }).catch((error) => {
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    });
  }

  return (
    <>
      <Modal open={open} onClose={onClose}>

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
            <div className="button-login">
              <button className="login" type="submit">Güncelle</button>
            </div>
          </Form>
        </Formik>
      </Modal>
      <ToastContainer></ToastContainer>
    </>
  )
}

export default UpdateModel