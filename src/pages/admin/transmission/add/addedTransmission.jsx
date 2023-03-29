import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import TransmissionService from "../../../../services/transmissionService"
import FormInput from "../../../../components/formElements/formInput"
import "../../../admin/styles.css"
import { useNavigate } from 'react-router-dom'
function AddedTransmission() {
    const navigate = useNavigate();
    const initialValues = {
        name: ""
    }

    const schema = Yup.object().shape({
        name: Yup.string().required("Vites ismi boş geçilemez").min(3,"Vites ismi en az üç karakterden oluşmalıdır")
    });

    const add = async (values) => {
        const result = await new TransmissionService().add({
            ...values
        });
        navigate(-1);
    }

    return (
        <>
         <div className='section container'>
                <div className='container grid'>
             <div className="content-header container">
                <i className='bx bx-menu header-icon' ></i>
                <span className="header-title">Add Transmission</span>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values) => add(values)}
            >
                <Form>
                    <FormInput type="text" name='name' />
                    <button className='add' type='submit'>Ekle</button>
                </Form>
            </Formik>
            </div>
            </div>
        </>
    )
}

export default AddedTransmission