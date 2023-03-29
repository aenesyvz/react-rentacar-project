import React from 'react'
import { useLocation } from 'react-router-dom'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import TransmissionService from "../../../../services/transmissionService"
import FormInput from "../../../../components/formElements/formInput"
import "../../../admin/styles.css"
function UpdateTransmission() {
    const location = useLocation();

    const initialValues = {
        id: location.state.transmission.id,
        name: location.state.transmission.name
    }

    const schema = Yup.object().shape({
        name: Yup.string().required("İsim alanı boş geçilemez").min(3).required("İsim en az 3 karakterden oluşmalırdır!")
    });

    const update = async (values) => {
        const result = await TransmissionService.update({
            ...values
        });
    }
    return (
        <>
            <div className='section container'>
                <div className='container grid'>
                    <div className="content-header container">
                        <i className='bx bx-menu header-icon' ></i>
                        <span className="header-title">Update Trasmission</span>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={(values) => update(values)}
                    >
                        <Form>
                            <FormInput type="text" name='name' />
                            <button className='update' type='submit'>Güncelle</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default UpdateTransmission