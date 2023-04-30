import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import BrandService from "../../../../services/brandService"
import FormInput from "../../../../components/formElements/formInput"
import FormSelect from "../../../../components/formElements/formSelect"
import ModelService from '../../../../services/modelService'
import Modal from '../../../../components/modal/modal'
import { ToastContainer, toast } from 'react-toastify'

function AddedModel({open, onClose,getAll}) {

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
    brandId: 0
  }

  const schema = Yup.object().shape({
    brandId: Yup.number().required(),
    name: Yup.string().required()
  });

  const add = async (values) => {
    const result = await new ModelService().add({
      ...values
    }).then((e) => {
      toast.success("Marka eklendi", {
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
    <Modal open={open} onClsoe={onClose}>
      <h2 className='modal-title'>Model Ekle</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => add(values)}
      >
        <Form>
          <FormInput label="Adı" name="name" type="text"></FormInput>
          <FormSelect
            label="Marka"
            name="brandId"
            options={brands.map((x) => ({
              value: x.id,
              label: x.name
            }))}
          ></FormSelect>
          <div className="button-login">
            <button className="login" type="submit">Ekle</button>
          </div>
        </Form>
      </Formik>
    </Modal>
    <ToastContainer></ToastContainer>
    </>
  )
}

export default AddedModel