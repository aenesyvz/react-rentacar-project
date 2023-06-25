import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import CityService from "../../../../services/cityService.js"
import { toast } from 'react-toastify'
import Modal from '../../../../components/modal/modal'
import FormInput from '../../../../components/formElements/formInput'
export default function AddedCity({open,onClose,getAll}) {
    const initialValues = {
        plateCode:0,
        name:""
    }

    const schema = Yup.object().shape({
        plateCode: Yup.number().moreThan(0).required("Plaka kodu 0'dan büyük olmalıdır"),
        name:Yup.string().required("İl ismi boş geçilemez")
    })

    const add = async(values) => {
        await new CityService().add({
            ...values
        }).then((e) => {
            toast.success(values.name + " ili kaydedildi!",{
                position:toast.POSITION.BOTTOM_RIGHT
            });
            getAll();
            onClose();
        }).catch((error)=>{
            toast.error(error.response.data.message,{
                position:toast.POSITION.BOTTOM_RIGHT
            });
        })
    }
  return (
    <>
        <Modal open={open} onClose={onClose}>
            <h2 className='modal-title'>Şehir Ekle</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values) => add(values)}
            >
                <Form>
                    <FormInput label="Plaka Kodu" type={text} name="plateCode"></FormInput>
                    <FormInput label="Ad" type={text} name="name"></FormInput>
                    <div className="button-login">
                            <button className="login" type="submit">Ekle</button>
                        </div>
                </Form>
            </Formik>
        </Modal>
    </>
  )
}
