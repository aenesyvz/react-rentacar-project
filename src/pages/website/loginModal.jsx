import React from "react";
import {  Form, Formik,  } from 'formik';
import FormInput from "../../components/formElements/formInput";
import * as Yup from "yup"
import ResetPasswordModal from './resetPasswordModal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import UserService from '../../services/userService';
import { ToastContainer, toast } from 'react-toastify';
import { userLogin } from '../../store/actions/authActions';
import { useNavigate } from "react-router-dom";

 const LoginModal = ({ open, onClose }) => {

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [openResetPasswordModal, setopenResetPasswordModal] = useState(false);
    if (!open) return null;

   

    const handleLogin = (user) => {
        dispatch(userLogin({...user}));
    };

    const initialValues = {
        email:"",
        password:"",
    }

    const schema = Yup.object().shape({
        email:Yup.string().required("Email boş bırakılamaz").email(),
        password:Yup.string().required("Şifrenizi giriniz")
    });

    const login = async(values) => {
        await new UserService().login({
            ...values
        }).then((e)=>{
          
            toast.success("Giriş başarılı!",{
                position:toast.POSITION.BOTTOM_RIGHT
            });
            console.log(e.data);
          handleLogin(e.data);
          onClose();
          navigate("/admin/brand/getList")
            
        }).catch((error)=>{
            toast.error(error.response.data.message,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        });
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
                    <h2 className="modal-title">Hoş Geldiniz!</h2>
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
                              <button className="login" type="submit">Giriş Yap</button>
                            </div>
                        </Form>
                    </Formik>
                    
                </div>
            </div>
          </div>
          }

          {  openResetPasswordModal == true &&<ResetPasswordModal 
                open={openResetPasswordModal}
                onClose={() => setopenResetPasswordModal(false)}
            ></ResetPasswordModal>}
        <ToastContainer></ToastContainer>
        </>
    );
}; 



export default LoginModal;



