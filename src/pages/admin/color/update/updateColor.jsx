import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import ColorService from '../../../../services/colorService';
import FormInput from '../../../../components/formElements/formInput';
import "../../../admin/styles.css"
import Modal from '../../../../components/modal/modal';
import { ToastContainer, toast } from 'react-toastify';

function UpdateColor({open,onClose,item,getAll}) {
    const initialValues = {
        id: item.id,
        name: item.name
    }

    const schema = Yup.object().shape({
        name: Yup.string().required("İsim alanı boş geçilemez")
    });

    const update = async (values) => {
        await new ColorService().update({
            ...values
        }).then((e) => {
            toast.success(values.name + "renki güncellendi!",{
                position: toast.POSITION.BOTTOM_RIGHT
            });
            getAll();
            onClose();
        }).catch((error) => {
            toast.error(error.response.data.message,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        })
  
    }

    return (
        <>
             <Modal open={open} onClose={onClose}>
                     <h2 className="modal-title">Renk Güncelle</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={(values) => update(values)}
                    >
                        <Form>
                            <FormInput type="text" name="name" label="Ad" />
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

export default UpdateColor