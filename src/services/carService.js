import axios from "axios";
import "../environment";
import Constants from "../environment";

export default class CarService {
    url = Constants.API_URL + "/cars";

    add({ brandId, name, colorId, modelId, kilometer, modelYear, plate, transmissionId, fuelId, carStateId, minFindeksCreditRate, motorPower, torque }) {
        return axios.post(this.url + "/add",{brandId, name, colorId, modelId, kilometer, modelYear, plate, transmissionId, fuelId, carStateId, minFindeksCreditRate, motorPower, torque });
    }

    update({id,brandId, name, colorId, modelId, kilometer, modelYear, plate, transmissionId, fuelId, carStateId, minFindeksCreditRate, motorPower, torque }){
        return axios.put(this.url + "/update",{id,brandId, name, colorId, modelId, kilometer, modelYear, plate, transmissionId, fuelId, carStateId, minFindeksCreditRate, motorPower, torque });
    }

    delete(id){
        return axios.delete(this.url + "/delete",{params:id});
    }

    getAll(){
        return axios.get(this.url + "/getList");
    }

    getById(id){
        return axios.get(this.url + "/getById",{params:id});
    }
}