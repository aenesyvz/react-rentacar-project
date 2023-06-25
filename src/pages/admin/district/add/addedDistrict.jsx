import React from 'react'
import * as Yup from "yup"
import DistrictService from '../../../../services/districtService';
import { toast } from 'react-toastify';
import Modal from '../../../../components/modal/modal'
import { Form, Formik } from 'formik';
import FormInput from '../../../../components/formElements/formInput';
import CityService from '../../../../services/cityService';

function AddedDistrict({open,onClose,getAll}) {
    const [cities, setCities] = useState([]);

    const getAllCity = async() => {
        const result = await new CityService().getAll();
        setCities(result.data);
    }

    useEffect(() => {
        getAllCity();
    }, []);
    

    const initialValues = {
        cityId:0,
        name:""
    }

    const schema = Yup.object().shape({
        cityId:Yup.number().moreThan(0).required("Lütfen bir şehir seçiniz"),
        name:Yup.string().required("Lütfen ilçe ismini giriniz")
    });

    const add = async(values) => {
        await new DistrictService().add({
            ...values
        }).then((e) => {
            toast.success(values.name + " ilçesi kaydedildi",{
                position:toast.POSITION.BOTTOM_RIGHT
            });
            getAll();
            onClose();
        }).catch((error)=>{
            toast.error(error.response.data.message,{
                position:toast.POSITION.BOTTOM_RIGHT
            });
        });
    }
  return (
    <>
        <Modal  open={open} onClose={onClose}>
        <h2 className='modal-title'>İl.e Ekle</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values) => add(values)}
            >
                <Form>
                    <FormInput label="İl" type={text} name="cityId"></FormInput>
                    <FormInput label="İlçe Adı" type={text} name="name"></FormInput>
                    <div className="button-login">
                            <button className="login" type="submit">Ekle</button>
                        </div>
                </Form>
            </Formik>
        </Modal>
    </>
  )
}

export default AddedDistrict