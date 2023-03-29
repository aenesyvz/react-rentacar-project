import React from 'react'
import { useLocation } from 'react-router-dom'
import CarDamageService from '../../../../services/carDamageService'
import { Form, Formik } from "formik"
import FormInput from '../../../../components/formElements/formInput'
import FormTextArea from '../../../../components/formElements/formTextArea'
function UpdateCarDamage() {
    const location = useLocation();

    const initialValues = {
        id: location.state.carDamage.id,
        carId: location.state.carDamage.carId,
        damageDescription: location.state.carDamage.damageDescription,
        isFixed: location.state.carDamage.isFixed
    }

    const schema = Yup.object().shape({
        damageDescription: Yup.string().required(),
        isFixed: Yup.boolean().required()
    })
    const update = async (values) => {
        const result = await CarDamageService.update({
            ...values
        });
    }

    return (
        <>
        
        <div className="content-header container">
                    <i className='bx bx-menu header-icon' ></i>
                    <span className="header-title">Update Car Damage</span>
            </div>
         
        <div>
            <Formik
                initialValues={initialValues}
                schema={schema}
                onSubmit={(values) => update(values)}
            >
                <Form>
                    <FormInput type="checkbox" name="isFixed" value="true"></FormInput>
                    <FormTextArea name="damageDescription" id="" cols="30" rows="10"></FormTextArea>

                    <button type='submit'></button>
                </Form>
            </Formik>
        </div>
        </>
    )
}

export default updateCarDamage