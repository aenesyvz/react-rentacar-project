import axios from "axios";
import "../environment"
import Constants from "../environment";
export default class CarDamageService{
    url = Constants.API_URL + "/carDamages";

    add({carId,damageDescription,isFixed}){
        return axios.post(this.url + "/add",{carId,damageDescription,isFixed});
    }

    update({id,carId,damageDescription,isFixed}){
        return axios.put(this.url + "/update",{id,carId,damageDescription,isFixed});
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

    getByCarId(id){
        return axios.get(this.url + "/getByCarId",{params:id});
    }
}