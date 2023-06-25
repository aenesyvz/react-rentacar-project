import React, { useEffect } from 'react'
import CityService from '../../../../services/cityService';
import DistrictService from '../../../../services/districtService';
import * as Yup from "yup"
import Modal from '../../../../components/modal/modal';
import RentalBranchService from '../../../../services/rentalBranchService';
import { toast } from 'react-toastify';

function AddedRentalBranch({open,onClose,getAll}) {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);

    const getAllCity = async() =>{
        const result = await new CityService().getAll();
        setCities(result.data);
    }

    const getAllDistrictByCityId = async(cityId) => {
        const result = await new DistrictService().getAll(cityId);
        setDistricts(result.data);
    }

    useEffect(() => {
      getAllCity();
    }, [])

    const initialValues = {
        cityId:0,
        districtId:0,
        name:"",
        address:"",
        phoneNumber:"",
        email:""
    }

    const schema = Yup.object().shape({
        cityId:Yup.number().moreThan(0).required("Lütfen bir il seçiniz"),
        districtId:Yup.number().moreThan(0).required("Lütfen bir ilçe seçiniz"),
        name:Yup.string().required("Lütfen bir şube ismi giriniz"),
        address:Yup.string().required("Lütfen bir adres giriniz"),
        phoneNumber:Yup.string().required("Lütfen bir telefon numarası giriniz"),
        email:Yup.string().email.required("Lütfen bir email giriniz"),
    })
    
    const add = async(values) => {
        await new RentalBranchService().add({
            ...values
        }).then((e) => {
            toast.success(values.name + " şubesi kaydedildi!",{
                position:toast.POSITION.BOTTOM_RIGHT
            });
            getAll();
            onClose();
        }).catch((error)=>{
            toast.error(error.response.data.message,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        })
    }
  return (
    <>
     <Modal open={open} onClose={onClose}>
                     <h2 className="modal-title">Şube Ekle</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={(values) => add(values)}
                    >
                        <Form>
                            <FormInput type="text" name='cityId' label="İl" />
                            <FormInput type="text" name='districtId' label="İlçe" />
                            <FormInput type="text" name='name' label="Şube Adı" />
                            <FormInput type="text" name='address' label="Adres" />
                            <FormInput type="text" name='phoneNumber' label="Telefon Numarası" />
                            <FormInput type="text" name='email' label="Email" />
                            <div className="button-login">
                              <button className="login" type="submit">Ekle</button>
                            </div>
                        </Form>
                    </Formik>
              </Modal>
    </>
  )
}

export default AddedRentalBranch