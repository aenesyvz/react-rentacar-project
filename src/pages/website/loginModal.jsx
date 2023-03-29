import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import FormInput from "../../components/formElements/formInput";
import * as Yup from "yup"

 const LoginModal = ({ open, onClose }) => {
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

    }

    return (
        <>
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
                            <FormInput name="email"></FormInput>
                            <FormInput name="password" type="password"></FormInput>
                            <div className="button-login">
                              <button className="login" type="submit">Sign In</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
          </div>
        </>
    );
}; 



export default LoginModal;



