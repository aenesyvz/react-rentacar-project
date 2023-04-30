import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import ColorService from "../../../../services/colorService"
import FormInput from "../../../../components/formElements/formInput"
import "../../../admin/styles.css"
import Modal from '../../../../components/modal/modal'
import { ToastContainer, toast } from 'react-toastify'

function AddedColor({open,onClose,getAll}) {
    const initialValues = {
        name: ""
    }

    const schema = Yup.object().shape({
        name: Yup.string().required("Renk ismi boş geçilemez").min(3,"İsim en az üç karakter olamalıdır")
    });

    const add = async (values) => {
        await new ColorService().add({
            ...values
        }).then((e) => {
            toast.success(values.name + "renk eklendi!",{
                position: toast.POSITION.BOTTOM_RIGHT
            });
            getAll();
            onClose();
        }).catch((error) => {
            toast.error(error.response.data.message,{
                position:toast.POSITION.BOTTOM_RIGHT
            });
        }) ;
    }

    return (
        <>
           <Modal open={open} onClose={onClose}>
                     <h2 className="modal-title">Renk Ekle</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={(values) => add(values)}
                    >
                        <Form>
                            <FormInput label="Ad" type="text" name="name" />
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

export default AddedColor