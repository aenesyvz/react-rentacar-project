import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import CarDamageService from "../../../../services/carDamageService"
import FormInput from "../../../../components/formElements/formInput"
import FormTextArea from "../../../../components/formElements/formTextArea"
function AddedCarDamage({ carId }) {
    const initialValues = {
        carId: carId,
        damageDescription: "",
        isFixed: false
    }

    const schema = Yup.object().shape({
        damageDescription: Yup.string().required(),
        isFixed: Yup.boolean().required()
    })

    const add = async (values) => {
        const result = await new CarDamageService().add(
            ...values
        );
    }
    return (
        <>

            <div className="content-header container">
                <i className='bx bx-menu header-icon' ></i>
                <span className="header-title">Add Car Damage</span>
            </div>

            <Formik
                initialValues={initialValues}
                schema={schema}
                onSubmit={(values) => add(values)}
            >
                <Form>
                    <FormInput type="checkbox" name="isFixed" value="true"></FormInput>
                    <FormTextArea name="damageDescription" id="" cols="30" rows="10"></FormTextArea>

                    <button type='submit'></button>
                </Form>
            </Formik>
        </>
    )
}

export default AddedCarDamage