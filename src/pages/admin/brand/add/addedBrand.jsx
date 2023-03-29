import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import BrandService from "../../../../services/brandService.js"
import FormInput from "../../../../components/formElements/formInput"
import "../styles.css"
import { useNavigate } from 'react-router-dom'
function AddedBrand() {
    const navigate = useNavigate();
    const initialValues = {
        name: ""
    }

    const schema = Yup.object().shape({
        name: Yup.string().required("Marka ismi boş geçilemez!")
    });

    const add = async (values) => {
        const result = await new BrandService().add({
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
                    <span className="header-title">Add Brand</span>
            </div>
         

                <div>

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
    </div>
        </>
    )
}

export default AddedBrand