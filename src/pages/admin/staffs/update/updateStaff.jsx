import React from 'react'
import * as Yup from "yup"
import StaffService from "../../../../services/staffService"
import { toast } from 'react-toastify'
import Modal from '../../../../components/modal/modal'
import { Form, Formik } from 'formik'
import FormInput from '../../../../components/formElements/formInput'
import FormTextArea from '../../../../components/formElements/formTextArea'
import { useLocation } from 'react-router-dom'
import AdminLayout from '../../../../layouts/admin/AdminLayout'

function UpdateStaff() {
    const location = useLocation();
    const initialValues = {
        id: location.state.item.id,
        email: location.state.item.id,
        password: location.state.item.password,
        firstName: location.state.item.firstName,
        lastName: location.state.item.lastName,
        nationalityIdentity: location.state.item.nationalityIdentity,
        dataOfBirth: location.state.item.dataOfBirth,
        phoneNumber: location.state.item.phoneNumber,
        address: location.state.item.address
    }

    const schema = Yup.object().shape({
        email: Yup.string().required().email(),
        password: Yup.string().required(),
        firstName: Yup.string().required().min(3, "Ad en az üç karakterden oluşmalıdır"),
        lastName: Yup.string().required().min(3, "Soyad en az üç karakterden oluşmalıdır"),
        nationalityIdentity: Yup.string().required().min(11, "TC Kimlik numarası 11 karakterden oluşmalı"),
        phoneNumber: Yup.string().required(),
        address: Yup.string().required()
    })

    const update = async (values) => {
        await new StaffService().update({
            ...values
        }).then((e) => {
            toast.success("Personel bilgileri güncellendi", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }).catch((error) => {
            toast.error(error.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        });
    }

    return (
        <>
            <AdminLayout>
                <h2 className='modal-title'>Personel Güncelle</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={(values) => update(values)}
                >
                    <Form>
                        <div className="form__content">
                            <FormInput label="Email" name="email"></FormInput>
                            <FormInput label="Şifre" name="password" type="password"></FormInput>
                            <FormInput label="Ad" name="firstName"></FormInput>
                            <FormInput label="Soyad" name="lastName"></FormInput>
                            <FormInput label="Kimlik Numarası" name="nationalityIdentity"></FormInput>
                            <FormInput label="Doğum Tarihi" name="dateOfBirth"></FormInput>
                            <FormInput label="Telefon Numarası" name="phoneNumber"></FormInput>
                            <FormTextArea rows={5} label="Adres" name="address"></FormTextArea>
                        </div>
                        <div className="button-login">
                            <button className="login" type="submit">Güncelle</button>
                        </div>
                    </Form>
                </Formik>
            </AdminLayout>
        </>
    )
}

export default UpdateStaff