import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import TransmissionService from "../../../../services/transmissionService"
import FormInput from "../../../../components/formElements/formInput"
import "../../../admin/styles.css"
import Modal from '../../../../components/modal/modal'

function AddedTransmission({ open, onClose }) {

    const initialValues = {
        name: ""
    }

    const schema = Yup.object().shape({
        name: Yup.string().required("Vites ismi boş geçilemez").min(3, "Vites ismi en az üç karakterden oluşmalıdır")
    });

    const add = async (values) => {
        await new TransmissionService().add({
            ...values
        });

    }

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <h2 className='modal-title'>Vites Ekle</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={(values) => add(values)}
                >
                    <Form>
                        <FormInput type="text" name='name' label="Ad"/>
                        <button className='add' type='submit'>Ekle</button>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}

export default AddedTransmission