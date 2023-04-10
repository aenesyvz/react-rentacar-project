import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import FormInput from "../../components/formElements/formInput";
import * as Yup from "yup"
import ResetPasswordModal from './resetPasswordModal';
import { useState } from 'react';

 const LoginModal = ({ open, onClose }) => {
    const [openResetPasswordModal, setopenResetPasswordModal] = useState(false);
    if (!open) return null;

    const initialValues = {
        email:"",
        password:"",
    }

    const schema = Yup.object().shape({
        email:Yup.string().required("Email boş bırakılamaz").email(),
        password:Yup.string().required("Şifrenizi giriniz")
    });

    const login = async(values) => {
        console.log({...values});
    }

    return (
        <>
        { openResetPasswordModal == false &&
          <div className="modal" onClick={(e) => {
            e.stopPropagation();
          }}>
            
          <div className="overlay" >
            <div className="x-button" onClick={onClose}>
                <div className="line line-1"></div>
                <div className="line line-2"></div>
            </div>
                <div className="modalContainer">
                    <h2 className="modal-title">Welcome Back!</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={(values) => login(values)}
                    >
                        <Form>
                            <FormInput label="Email" name="email"></FormInput>
                            <FormInput label="Şifre" name="password" type="password"></FormInput>
                            <p className='forgot-password' onClick={() => setopenResetPasswordModal(true)}>Şifremi unuttum</p>
                            <div className="button-login">
                              <button className="login" type="submit">Sign In</button>
                            </div>
                        </Form>
                    </Formik>
                    
                </div>
            </div>
          </div>}

          {  openResetPasswordModal == true &&<ResetPasswordModal 
                open={openResetPasswordModal}
                onClose={() => setopenResetPasswordModal(false)}
            ></ResetPasswordModal>}

        </>
    );
}; 



export default LoginModal;



