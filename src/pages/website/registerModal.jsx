import React, { useEffect, useRef, useState } from 'react'
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import * as Yup from "yup"
import { TextField } from '@mui/material';
import { FormikStepper } from '../../components/formElements/formikStepper.jsx';
import FormInput from "../../components/formElements/formInput";
import FormikStep from '../../components/formElements/FormikStep.tsx';


const RegisterModal = ({ open, onClose }) => {
    const [customerType, setcustomerType] = useState(null);


    if (!open) return null;

    const selectIndividual = () => {
      setcustomerType(true);
    }

    const selectCorporate = () => {
        setcustomerType(false);
    }


    const initialValuesForCorporateCustomer = {
        email: "",
        password: "",
        taxNo: "",
        companyName: "",
        phoneNumber: "",
    }

    const schemaCorporateStep1 = Yup.object().shape({
        email: Yup.string().required("Email boş bırakılamaz").email(),
        password: Yup.string().required("Şifrenizi giriniz"),
      
    });

    const schemaCorporateStep2 = Yup.object().shape({
        taxNo: Yup.string().required(),
        companyName: Yup.string().required(),
        phoneNumber: Yup.number().required()
    });

    const initialValuesForIndividualCustomer = {
        firstName: "",
        lastName: "",
        nationalityIdentity: "",
        dateOfBirth: "",
   
    }
    const schemaIndividualStep1 = Yup.object().shape({
        firstName: Yup.string().required("İsim boş bırakılamaz"),
        lastName: Yup.string().required("Soyad giriniz"),
    });

    const schemaIndividualStep2 = Yup.object().shape({
        nationalityIdentity: Yup.string().required("TC kimlik numarası boş bırakılamaz").length(11,"TC kimlik numarası 11 haneli olmalıdır"),
        dateOfBirth: Yup.date().required("Doğum günüzü giriniz"),
    });


    const register = async (values) => {
        console.log({...values});
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
                        <h2 className="modal-title">{customerType == null ? "Welcome !" : (customerType ? "Individual Customer Register":"Corporate Customer Register")}</h2>

                       {customerType == null && <div className="button-select-customer">
                              <h3 className='subtitle'>Please, choose user type </h3>
                              <button className="customer" onClick={()=>selectIndividual() }>Individual Customer</button>
                              <button className="customer"  onClick={()=>selectCorporate() }>Corporate Customer</button>
                        </div>}
                        {customerType == false && <FormikStepper
                            initialValues={initialValuesForCorporateCustomer}
                            changeCustomerNull = {() => setcustomerType(null)}
                            onSubmit={(values) => register(values)}
                           
                        >
                            <FormikStep
                                validationSchema={schemaCorporateStep1}
                            >
                                <FormInput name="email"></FormInput>
                                <FormInput name='password'></FormInput>
                            </FormikStep>
                            <FormikStep
                                validationSchema={schemaCorporateStep2}
                            >
                                <FormInput name='phoneNumber'></FormInput>
                                <FormInput name='companyName'></FormInput>
                                <FormInput name='taxNo'></FormInput>
                            </FormikStep>


                        </FormikStepper>}


                        {customerType == true && <FormikStepper
                            initialValues={initialValuesForIndividualCustomer}
                            changeCustomerNull = {() => setcustomerType(null)}
                            onSubmit={(values) => register(values)}
                           
                        >
                            <FormikStep
                                validationSchema={schemaIndividualStep1}
                            >
                                <FormInput name="firstName"></FormInput>
                                <FormInput name='lastName'></FormInput>
                            </FormikStep>
                            <FormikStep
                                validationSchema={schemaIndividualStep2}
                            >
                                <FormInput name='nationalityIdentity'></FormInput>
                                <FormInput type="date" name='dateOfBirth'></FormInput>
                              
                            </FormikStep>


                        </FormikStepper>}
                    </div>
                </div>
            </div>




        </>
    );
};

export default RegisterModal;



