import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import BrandService from "../../../../services/brandService.js"
import FormInput from "../../../../components/formElements/formInput"

function UpdatedBrand({open,onClose,item}) {
    const initialValues = {
        id: item.brand.id,
        name: item.brand.name
    }

    const schema = Yup.object().shape({
        name: Yup.string().required("İsim alanı boş geçilemez").min(3).required("İsim en az üç karakterli olmalıdır")
    });

    const update = async (values) => {
        const result = await new BrandService().update({
            ...values
        });
    }

    return (
        <>
          
          <Modal open={open} onClose={onClose}>
                     <h2 className="modal-title">Renk Güncelle</h2>
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
               </Modal>
        </>
    )
}

export default UpdatedBrand