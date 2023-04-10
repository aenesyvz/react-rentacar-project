import React, { useEffect, useRef, useState } from 'react'
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import * as Yup from "yup"
import { TextField } from '@mui/material';
import { FormikStepper } from '../../components/formElements/formikStepper.jsx';
import FormInput from "../../components/formElements/formInput";
import FormikStep from '../../components/formElements/FormikStep.tsx';
import CorporateCustomerService from '../../services/corporateCustomerService.js';
import IndividualCustomerService from '../../services/individualCustomerService.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterModal = ({ open, onClose }) => {
    const [customerType, setcustomerType] = useState(null);


    if (!open) return null;

    const selectIndividual = () => {
        setcustomerType(4);
    }

    const selectCorporate = () => {
        setcustomerType(3);
    }


    const initialValuesForCorporateCustomer = {
        email: "",
        password: "",
        companyName: "",
        taxNo: "",
        phoneNumber: "",
    }

    const schemaCorporateStep1 = Yup.object().shape({
        email: Yup.string().required("Email boş bırakılamaz").email(),
        password: Yup.string().required("Şifrenizi giriniz"),

    });

    const schemaCorporateStep2 = Yup.object().shape({
        companyName: Yup.string().required(),
        taxNo: Yup.string().required(),
        phoneNumber: Yup.number().required()
    });



    const initialValuesForIndividualCustomer = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        nationalityIdentity: "",
        dateOfBirth: "",
        phoneNumber: "",
    }

    const schemaIndividualStep1 = Yup.object().shape({
        firstName: Yup.string().required("İsim boş bırakılamaz"),
        lastName: Yup.string().required("Soyad giriniz"),
    });

    const schemaIndividualStep2 = Yup.object().shape({
        email: Yup.string().required("Email boş bırakılamaz"),
        password: Yup.string().required("Şifre boş bırakılamaz"),
        phoneNumber: Yup.string().required("Telefon numarası boş bırakılamaz"),
    });
    const schemaIndividualStep3 = Yup.object().shape({
        nationalityIdentity: Yup.string().required("TC kimlik numarası boş bırakılamaz").length(11, "TC kimlik numarası 11 haneli olmalıdır"),
        dateOfBirth: Yup.date().required("Doğum gününüzü giriniz"),
    });


    const register = async (values) => {
        if (customerType == 3) {
            await new CorporateCustomerService().add({
                ...values
            }).then((e) => {
                toast.success('Başarılı bir şekilde kayıt oldunuz. Lütfen email adresinizi doğrulayınız !', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }).catch((error) => {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
    
            })
        }
        if (customerType == 4) {
            await new IndividualCustomerService().add({
                ...values
            }).then((e) => {
                toast.success('Başarılı bir şekilde kayıt oldunuz. Lütfen email adresinizi doğrulayınız !', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }).catch((error) => {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    
                });
            })
        }
    }

    const handleXButton = () => {
        onClose();
        setcustomerType(null);
    }

    return (
        <>
            <div className="modal" onClick={(e) => {
                e.stopPropagation();
            }}>

                <div className="overlay" >
                    <div className="x-button" onClick={() => handleXButton()}>
                        <div className="line line-1"></div>
                        <div className="line line-2"></div>
                    </div>
                    <div className="modalContainer">
                        <h2 className="modal-title">{customerType == null ? "Welcome !" : (customerType == 4 ? "Individual Customer Register" : "Corporate Customer Register")}</h2>

                        {customerType == null && <div className="button-select-customer">
                            <h3 className='subtitle'>Please, choose user type </h3>
                            <button className="customer" onClick={() => selectIndividual()}>Individual Customer</button>
                            <button className="customer" onClick={() => selectCorporate()}>Corporate Customer</button>
                        </div>}
                        {customerType == 3 && <FormikStepper
                            initialValues={initialValuesForCorporateCustomer}
                            changeCustomerNull={() => setcustomerType(null)}
                            onSubmit={(values) => register(values)}

                        >

                            <FormikStep
                                validationSchema={schemaCorporateStep1}
                            >
                                <FormInput label="Email" name="email"></FormInput>
                                <FormInput label="Şifre" name='password'></FormInput>
                            </FormikStep>
                            <FormikStep
                                validationSchema={schemaCorporateStep2}
                            >
                                <FormInput label="Şirket Adı" name='companyName'></FormInput>
                                <FormInput label="Vergi Numarası" name='taxNo'></FormInput>
                                <FormInput label="Telefon Numarası" name='phoneNumber'></FormInput>
                            </FormikStep>


                        </FormikStepper>}


                        {customerType == 4 && <FormikStepper
                            initialValues={initialValuesForIndividualCustomer}
                            changeCustomerNull={() => setcustomerType(null)}
                            onSubmit={(values) => register(values)}

                        >
                            <FormikStep
                                validationSchema={schemaIndividualStep1}
                            >
                                <FormInput label="Ad" name="firstName"></FormInput>
                                <FormInput label="Soyad" name='lastName'></FormInput>
                            </FormikStep>
                            <FormikStep
                                validationSchema={schemaIndividualStep2}
                            >
                                <FormInput label="Email" name="email"></FormInput>
                                <FormInput label="Şifre" name='password'></FormInput>
                                <FormInput label="Telefon Numarası" name='phoneNumber'></FormInput>
                            </FormikStep>
                            <FormikStep
                                validationSchema={schemaIndividualStep3}
                            >
                                <FormInput label="TC Kimlik Numarası" name='nationalityIdentity'></FormInput>
                                <FormInput label="Doğum Tarihi" type="date" name='dateOfBirth'></FormInput>

                            </FormikStep>


                        </FormikStepper>}
                    </div>
                </div>
            </div>




        </>
    );
};

export default RegisterModal;



