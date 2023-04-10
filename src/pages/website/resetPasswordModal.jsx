import React, { useEffect, useRef, useState } from 'react'
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import * as Yup from "yup"
import { TextField } from '@mui/material';
import { FormikStepper } from '../../components/formElements/formikStepper.jsx';
import FormInput from "../../components/formElements/formInput";
import FormikStep from '../../components/formElements/FormikStep.tsx';
import UserService from '../../services/userService.js';
import ActivationCodeService from '../../services/activationCodeService.js';


const ResetPasswordModal = ({ open, onClose }) => {
    const [step, setStep] = useState(0);
    const [userEmail, setuserEmail] = useState("");
    const [stepsFormMarginLeft, setstepsFormMarginLeft] = useState(800)
    if (!open) return null;



    const initialValuesForResetPassword1 = {
        email: "",
    }
    const initialValuesForResetPassword2 = {
        code: "",
    }
    const initialValuesForResetPassword3 = {
        newPassword: "",
        reNewPassword: ""
    }

    const schemaResetPassword1 = Yup.object().shape({
        email: Yup.string().required("Email boş bırakılamaz").email(),
    });

    const schemaResetPassword2 = Yup.object().shape({
        code: Yup.string().required("Email boş bırakılamaz"),
    });

    const schemaResetPassword3 = Yup.object().shape({
        newPassword: Yup.string().required("Email boş bırakılamaz"),
        reNewPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], "Passwords don't match!")
            .required('Required')
    });


    const sendConfirmCode = async (values) => {
        console.log("dsdfsd");
        // const result = await new UserService().sendConfirmCode({
        //     ...values
        // });

        //return result.data.success;
        setuserEmail(values["email"]);

        setStep((s) => s + 1);
        setstepsFormMarginLeft(0);
    }

    const confirm = async (values) => {
        let error;
        console.log("confirm" + values);
        // const result = await new ActivationCodeService().confirm({
        //     ...values
        // });
        console.log("confirm");
        setStep((s) => s + 1);
        setstepsFormMarginLeft(-800);
    }


    const resetPassword = async (values) => {
        // const result = await new UserService().resetPassword({
        //   ...[values["email"],values["newPassword"],values["reNewPassword"]]
        // });
        console.log({ userEmail, ...values });
        onClose();
    }
    const handleXButton = () => {
        onClose();
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
                        <h2 className="modal-title">Reset Password</h2>

                        <div className='steps' style={{transition:.4,marginLeft:stepsFormMarginLeft}}>
                            <div className={step == 0 ? "step step-0 active" : "step step-0"}>
                                <Formik
                                    initialValues={initialValuesForResetPassword1}
                                    validationSchema={schemaResetPassword1}
                                    onSubmit={(values) => sendConfirmCode(values)}
                                >
                                    <Form>
                                        <FormInput label="Email" name="email"></FormInput>

                                        <div className="button-login">
                                            <button className="login" type="submit">Next</button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>



                            <div className={step == 1 ? "step step-1 active" : "step step-1"}>
                                <div className='step-content' >
                                    <p>{userEmail} adresine gelen doğrulama kodunu giriniz</p>
                                    <p>Kalan süre 3:00 dk</p>
                                    <Formik
                                        initialValues={initialValuesForResetPassword2}
                                        validationSchema={schemaResetPassword2}
                                        onSubmit={(values) => confirm(values)}
                                    >

                                        <Form>
                                            <FormInput label="Kod" name="code"></FormInput>
                                            <div className="button-login">
                                                <button className="login" type="submit">Next</button>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>

                            <div className={step == 2 ? "step step-2 active" : "step step-2"}>
                                <Formik
                                    initialValues={initialValuesForResetPassword3}
                                    validationSchema={schemaResetPassword3}
                                    onSubmit={(values) => resetPassword(values)}
                                >
                                    <Form>
                                        <FormInput label="Şifre" name="newPassword" type="password"></FormInput>
                                        <FormInput  label="Şifre Tekrarı" name="reNewPassword" type="password"></FormInput>
                                        <div className="button-login">
                                            <button className="login" type="submit">Submit</button>
                                        </div>
                                    </Form>
                                </Formik>

                            </div>

                        </div>


                    </div>
                </div>
            </div>




        </>
    );
};

export default ResetPasswordModal;



