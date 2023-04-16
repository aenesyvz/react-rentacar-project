import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import FuelService from "../../../../services/fuelService"
import FormInput from "../../../../components/formElements/formInput"
import "../../../admin/styles.css"
import { toast } from 'react-toastify'
import Modal from '../../../../components/modal/modal'

function AddedFuel({open,onClose}) {
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
                            <button  className='add' type='submit'>Ekle</button>
                        </Form>
                    </Formik>
              </Modal>
        </>
    )
}

export default AddedFuel