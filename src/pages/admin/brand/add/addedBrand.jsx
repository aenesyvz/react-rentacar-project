import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import BrandService from "../../../../services/brandService.js"
import FormInput from "../../../../components/formElements/formInput"
import "../styles.css"
import { useNavigate } from 'react-router-dom'
import Modal from '../../../../components/modal/modal.jsx'

function AddedBrand({ open, onClose }) {
   
    const initialValues = {
        name: ""
    }

    const schema = Yup.object().shape({
        name: Yup.string().required("Marka ismi boş geçilemez!")
    });

    const add = async (values) => {
        const result = await new BrandService().add({
            ...values
        });
      
        onClose();
        
    }

    return (
       <>
                <Modal open={open} onClose={onClose}>
                     <h2 className="modal-title">Add Brand</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={(values) => add(values)}
                    >
                        <Form>
                            <FormInput label="Ad" type="text" name='name' />
                            <div className="button-login">
                              <button className="login" type="submit">Ekle</button>
                            </div>
                        </Form>
                    </Formik>
                    </Modal>
        </>
    )
}

export default AddedBrand