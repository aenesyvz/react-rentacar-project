import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import FuelService from '../../../../services/fuelService';
import FormInput from '../../../../components/formElements/formInput';
import "../../../admin/styles.css"
import { ToastContainer, toast } from 'react-toastify';
import Modal from '../../../../components/modal/modal';
function UpdateFuel({open,onClose,item,getAll}) {
   

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
            getAll();
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
                             <div className="button-login">
                              <button className="login" type="submit">Güncelle</button>
                            </div>
                        </Form>
                    </Formik>
         </Modal>
         <ToastContainer></ToastContainer>
        </>
    )
}

export default UpdateFuel