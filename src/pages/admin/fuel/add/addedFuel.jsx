import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import FuelService from "../../../../services/fuelService"
import FormInput from "../../../../components/formElements/formInput"
import "../../../admin/styles.css"
import { ToastContainer, toast } from 'react-toastify'
import Modal from '../../../../components/modal/modal'

function AddedFuel({open,onClose,getAll}) {
    const initialValues = {
        name: ""
    }

    const schema = Yup.object().shape({
        name: Yup.string().required()
    });

    const add = async (values) => {
        await new FuelService().add({
            ...values
        }).then((e) => {
            toast.success(values.name + " yakıtı eklendi!",{
                position:toast.POSITION.BOTTOM_RIGHT
            });
            getAll();
            onClose();
        }).catch((error) =>{
            toast.error(error.response.data.message,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        });

    }

    return (
        <>
              <Modal open={open} onClose={onClose}>
                     <h2 className="modal-title">Yakıt Ekle</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={(values) => add(values)}
                    >
                        <Form>
                            <FormInput type="text" name='name' label="Ad" />
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

export default AddedFuel