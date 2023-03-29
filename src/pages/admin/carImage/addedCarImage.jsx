import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import CarImageService from "../../../services/carImageService"

function AddedCarImage({ carId }) {
    const initialValues = {
        image: null
    }

    schema = Yup.object().shape({
        image: Yup.mixed().required()
    })

    add = async (values) => {
        const result = await new CarImageService().add(
            carId,
            values.image
        );
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values) => add(values)}
            >
                <Form>
                    <input type="file" name='image' />
                    <button type='submit'></button>
                </Form>
            </Formik>
        </div>
    )
}

export default AddedCarImage