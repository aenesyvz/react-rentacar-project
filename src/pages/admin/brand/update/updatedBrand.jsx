import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import BrandService from "../../../../services/brandService.js"
import FormInput from "../../../../components/formElements/formInput"
import { ToastContainer, toast } from 'react-toastify'
import Modal from '../../../../components/modal/modal.jsx'
import 'react-toastify/dist/ReactToastify.css';

function UpdatedBrand({ open, onClose, item, getAll }) {

    const initialValues = {
        id: item.id,
        name: item.name
    }

    const schema = Yup.object().shape({
        name: Yup.string().required("İsim alanı boş geçilemez").min(3).required("İsim en az üç karakterli olmalıdır")
    });

    const update = async (values) => {
        await new BrandService().update({
            ...values
        }).then((e) => {
            toast.success(values.name + "markası güncellendi!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            getAll();
            onClose();
        }).catch((error) => {
            toast.error(error.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        });
    }

    return (
        <>

            <Modal open={open} onClose={onClose}>
                <h2 className="modal-title">Marka Güncelle</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={(values) => update(values)}
                >
                    <Form>
                        <FormInput type="text" name='name' label="Ad" />
                        <div className="button-login">
                            <button className="login" type="submit">Güncelle</button>
                        </div>
                    </Form>


                </Formik>
            </Modal>
            <ToastContainer />
        </>
    )
}

export default UpdatedBrand