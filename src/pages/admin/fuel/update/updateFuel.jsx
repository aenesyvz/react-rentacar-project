import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import FuelService from '../../../../services/fuelService';
import FormInput from '../../../../components/formElements/formInput';
import "../../../admin/styles.css"
function UpdateFuel() {
    const navigate = useNavigate();
    const location = useLocation();

    const initialValues = {
        id: location.state.fuel.id,
        name: location.state.fuel.name
    }

    const schema = Yup.object().shape({
        name: Yup.string().required("İsim alanı boş geçilemez").min(3).required("En  az üç karakter olmalıdır!")
    })

    const update = async (values) => {
        const result = await new FuelService().update({
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
                        <span className="header-title">Update Fuel</span>
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

export default UpdateFuel