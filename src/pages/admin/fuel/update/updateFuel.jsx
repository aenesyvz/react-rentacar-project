import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import FuelService from '../../../../services/fuelService';
import FormInput from '../../../../components/formElements/formInput';
import "../../../admin/styles.css"
import { toast } from 'react-toastify';
import Modal from '../../../../components/modal/modal';
function UpdateFuel({open,onClose,item}) {
   

    const initialValues = {
        id: item.id,
        name: item.name
    }

    const schema = Yup.object().shape({
        name: Yup.string().required("İsim alanı boş geçilemez").min(3).required("En  az üç karakter olmalıdır!")
    })

    const update = async (values) => {
        await new FuelService().update({
            ...values
        }).then((e) => {
            toast.success(values.name + " yakıtı güncellendi!",{
                position:toast.POSITION.BOTTOM_RIGHT
            });
            onClose();
        }).catch((error) => {
            toast.success(error.response.data.message,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        });
    }


    return (
        <>
          <Modal open={open} onClose={onClose}>
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

export default UpdateFuel