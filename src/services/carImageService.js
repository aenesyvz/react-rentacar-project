import axios from "axios";
import "../environment"
import Constants from "../environment";
export default class CarImageService{
    url = Constants.API_URL + "/carImages";

    add(carId,file){
        const data = new FormData();
        data.append("file",file);
        return axios.post(this.url + "/add",data,{
            headers:{"Content-Type":"multipart/form-data"},
            params:{id},
        })
    }

    delete(id){
        return axios.delete(this.url + "/delete",{params:id});
    }

    getByCarId(carId){
        return axios.get(this.url + "/getByCarId",{params:carId});
    }

    getById(id){
        return axios.get(this.url + "/getById",{params:id});
    }
    
}