import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import ColorService from "../../../../services/colorService"
import FormInput from "../../../../components/formElements/formInput"
import "../../../admin/styles.css"
import Modal from '../../../../components/modal/modal'

function AddedColor({open,onClose}) {
    const initialValues = {
        name: ""
    }

    const schema = Yup.object().shape({
        name: Yup.string().required("Renk ismi boş geçilemez").min(3,"İsim en az üç karakter olamalıdır")
    });

    const add = async (values) => {
        const result = await new ColorService().add({
            ...values
        });
        onClose();
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
                            <button className='add' type='submit'>Ekle</button>
                        </Form>

                    </Formik>
               </Modal>
        </>
    )
}

export default AddedColor