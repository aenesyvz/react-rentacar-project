import React from 'react'
import * as Yup from "yup"
import CityService from '../../../../services/cityService';
import { toast } from 'react-toastify';

function UpdatedCity({open,onClose,item,getAll}) {
    const initialValues = {
        id:item.id,
        plateCode:item.plateCode,
        name:item.name
    }

    const schema = Yup.object().shape({
        plateCode:Yup.number().moreThan(0).required("Plaka kodu 0'dan büyük olmalıdır"),
        name:Yup.string().required("İl adı boş geçilemez")
    });

    const update = async(values) => {
        await new CityService().update({
            ...values
        }).then((e)=> {
            toast.success(values.name + "ili güncellendi",{
                position:toast.POSITION.BOTTOM_RIGHT
            }),
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
          <Modal open={open} onClose={onClose}>
            <h2 className='modal-title'>Şehir Güncelle</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values) => update(values)}
            >
                <Form>
                    <FormInput label="Plaka Kodu" type={text} name="plateCode"></FormInput>
                    <FormInput label="Ad" type={text} name="name"></FormInput>
                    <div className="button-login">
                            <button className="login" type="submit">Güncelle</button>
                        </div>
                </Form>
            </Formik>
        </Modal>
    </>
  )
}

export default UpdatedCity