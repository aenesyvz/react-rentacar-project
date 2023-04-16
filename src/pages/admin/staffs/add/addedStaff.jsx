import React from 'react'
import * as Yup from "yup"
import StaffService from "../../../../services/staffService"
import { toast } from 'react-toastify'

import { Form, Formik } from 'formik'
import FormInput from '../../../../components/formElements/formInput'
import FormTextArea from '../../../../components/formElements/formTextArea'
import AdminLayout from '../../../../layouts/admin/AdminLayout'

export default function AddedStaff() {
    const initialValues = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        nationalityIdentity: "",
        dataOfBirth: "",
        phoneNumber: "",
        address: ""
    }

    const schema = Yup.object().shape({
        email: Yup.string().required("Email adresi boş geçilemez").email(),
        password: Yup.string().required("Şifre boş geçilemez"),
        dataOfBirth:Yup.date().required("Doğum tarihinizi seçiniz").required(),
        firstName: Yup.string().required("İsim boş geçilemez").min(3, "Ad en az üç karakterden oluşmalıdır"),
        lastName: Yup.string().required("Soyad boş geçilmez").min(3, "Soyad en az üç karakterden oluşmalıdır"),
        nationalityIdentity: Yup.string().required("TC Kimlik Numarası boş geçilemez").min(11, "TC Kimlik numarası 11 karakterden oluşmalı"),
        phoneNumber: Yup.string().required("Telefon numarası boş geçilemez"),
        address: Yup.string().required("Adres boş geçilemez")
    })

    const add = async (values) => {
        await new StaffService().add({
            ...values
        }).then((e) => {
            toast.success(values.name, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }).catch((error) => {
            toast.error(error.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        });
    }

    return (
        <>
            <AdminLayout>
                <div className="content-header">
                    <i className='bx bx-menu header-icon' ></i>
                    <span className="header-title">Personel Ekle</span>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={(values) => add(values)}
                >
                    <Form>
                        <div className="form__content">
                            <FormInput label="Ad" name="firstName"></FormInput>
                            <FormInput label="Soyad" name="lastName"></FormInput>
                            <FormInput label="Email" name="email"></FormInput>
                            <FormInput label="Şifre" name="password" type="password"></FormInput>
                            <FormInput label="Kimlik Numarası" name="nationalityIdentity"></FormInput>
                            <FormInput label="Doğum Tarihi" name="dateOfBirth" type="date"></FormInput>
                            <FormInput label="Telefon Numarası" name="phoneNumber"></FormInput>
                            <FormTextArea rows={5} label="Adres" name="address"></FormTextArea>
                        </div>


                        <button className="login" type="submit">Ekle</button>

                    </Form>
                </Formik>
            </AdminLayout>
        </>
    )
}
