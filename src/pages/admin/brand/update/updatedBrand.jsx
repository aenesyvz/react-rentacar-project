import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import BrandService from "../../../../services/brandService.js"
import FormInput from "../../../../components/formElements/formInput"
import { toast } from 'react-toastify'
import Modal from '../../../../components/modal/modal.jsx'

function UpdatedBrand({open,onClose,item}) {
    
    const initialValues = {
        id: item.brand.id,
        name: item.brand.name
    }

    const schema = Yup.object().shape({
        name: Yup.string().required("İsim alanı boş geçilemez").min(3).required("İsim en az üç karakterli olmalıdır")
    });

    const update = async (values) => {
        await new BrandService().update({
            ...values
        }).then((e) => {
            toast.success(values.name + "markası güncellendi!",{
                position:toast.POSITION.BOTTOM_RIGHT
            });
            onClose();
        }).catch((error)=> {
            toast.error(error.response.data.message,{
                position:toast.POSITION.BOTTOM_RIGHT
            });
        });
    }

    return (
        <>
          
          <Modal open={open} onClose={onClose}>
                     <h2 className="modal-title">Marka Güncelle</h2>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={schema}
                            onSubmit={(values) => update(values)}
                        >
                            <Form>
                                <FormInput type="text" name='name' label="Ad" />
                                <button className='update' type='submit'>Güncelle</button>
                            </Form>


                        </Formik>
               </Modal>
        </>
    )
}

export default UpdatedBrand