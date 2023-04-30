import React from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import TransmissionService from "../../../../services/transmissionService"
import FormInput from "../../../../components/formElements/formInput"
import "../../../admin/styles.css"
import Modal from '../../../../components/modal/modal'
import { toast } from 'react-toastify'

function UpdateTransmission({ open, onClsoe, item ,getAll}) {
    const initialValues = {
        id: item.id,
        name: item.name
    }

    const schema = Yup.object().shape({
        name: Yup.string().required("İsim alanı boş geçilemez").min(3).required("İsim en az 3 karakterden oluşmalırdır!")
    });

    const update = async (values) => {
        await new TransmissionService().update({
            ...values
        }).then((e)=>{
            toast.success("Vites güncellendi!",{
                position:toast.POSITION.BOTTOM_RIGHT
            })
            getAll();
            onClsoe();
        }).catch((error)=>{
            toast.error(error.response.data.message,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        })
    }
    return (
        <>
            <Modal open={open} onClsoe={onClsoe}>
                <h2 className='modal-title'>Vites Güncelle</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={(values) => update(values)}
                >
                    <Form>
                        <FormInput type="text" name='name' />
                        <div className="button-login">
                            <button className="login" type="submit">Ekle</button>
                        </div>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}

export default UpdateTransmission