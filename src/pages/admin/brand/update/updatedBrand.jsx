import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import BrandService from "../../../../services/brandService.js"
import FormInput from "../../../../components/formElements/formInput"
function UpdatedBrand() {
    const navigate = useNavigate();
    const location = useLocation();

    const initialValues = {
        id: location.state.brand.id,
        name: location.state.brand.name
    }

    const schema = Yup.object().shape({
        name: Yup.string().required("İsim alanı boş geçilemez").min(3).required("İsim en az üç karakterli olmalıdır")
    });

    const update = async (values) => {
        const result = await new BrandService().update({
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
                        <span className="header-title">Update Brand</span>
                    </div>


                    <div>

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
            </div>
        </>
    )
}

export default UpdatedBrand