import React from 'react'
import Modal from '../../../../components/modal/modal'
import * as Yup from "yup"
import DistrictService from '../../../../services/districtService'
import { toast } from 'react-toastify'

function UpdatedDistrict({open,onClose,item,getAll}) {
    const initialValues = {
        id:item.id,
        cityId:item.cityId,
        name:item.name
    }

    const schema = Yup.object().shape({
        cityId:Yup.number().moreThan(0).required("Lütfen bir il seçiniz"),
        name:Yup.string().required("Lütfen bir ilçe ismi yazınınz")
    })

    const update = async(values) => {
        await new DistrictService().update({
            ...values
        }).then((e) => {
            toast.success(values.name + " ilçesi güncellendi",{
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
        <Modal>
        <h2 className='modal-title'>İlçe Güncelle</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values) => update(values)}
            >
                <Form>
                    <FormInput label="İl" type={text} name="cityId"></FormInput>
                    <FormInput label="İlçe Adı" type={text} name="name"></FormInput>
                    <div className="button-login">
                            <button className="login" type="submit">Güncelle</button>
                        </div>
                </Form>
            </Formik>
        </Modal>
    </>
  )
}

export default UpdatedDistrict