import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import BrandService from "../../../../services/brandService.js"
import FormInput from "../../../../components/formElements/formInput"
import "../styles.css"
import { useNavigate } from 'react-router-dom'
import Modal from '../../../../components/modal/modal.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddedBrand({ open, onClose,getAll }) {
   
    const initialValues = {
        name: ""
    }

    const schema = Yup.object().shape({
        name: Yup.string().required("Marka ismi boş geçilemez!")
    });

    const add = async (values) => {
        await new BrandService().add({
            ...values
        }).then((e) => {
            toast.success(values.name + 'markası kaydedildi  !', {
                position: toast.POSITION.BOTTOM_RIGHT,
                
            });
            getAll();
            onClose();
        }).catch((error) => {
            toast.error(error.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        });
    }

    return (
       <>
                <Modal open={open} onClose={onClose}>
                     <h2 className="modal-title">Marka Ekle</h2>
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
                    <ToastContainer />
        </>
    )
}

export default AddedBrand