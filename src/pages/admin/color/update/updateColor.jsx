import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import { useLocation, useNavigate } from 'react-router-dom'
import ColorService from '../../../../services/colorService';
import FormInput from '../../../../components/formElements/formInput';
import "../../../admin/styles.css"
function UpdateColor() {
    const navigate = useNavigate();
    const location = useLocation();
    const initialValues = {
        id: location.state.id,
        name: location.state.name
    }

    const schema = Yup.object().shape({
        name: Yup.string().required("İsim alanı boş geçilemez")
    });

    const update = async (values) => {
        const result = await new ColorService().update({
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
                        <span className="header-title">Update Color</span>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={(values) => update(values)}
                    >
                        <Form>
                            <FormInput type="text" name="name" />
                            <button className='update' type='submit'>Update</button>
                        </Form>

                    </Formik>
                </div>
            </div>
        </>
    )
}

export default UpdateColor