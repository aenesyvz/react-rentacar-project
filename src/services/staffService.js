import axios from "axios";
import "../environment.js"
import Constants from "../environment.js";

export default class StaffService{
    url = Constants.API_URL + "/staffs";

    getAll(){
        return axios.get(this.url + "/getAll");
    }

    getById({id}){
        return axios.get(this.url + "/getById",{params:id})
    }

    add({email,password,firstName,lastName,nationalityIdentity,dateOfBirth,phoneNumber,address}){
        return axios.post(this.url + "/add",{email,password,firstName,lastName,nationalityIdentity,dateOfBirth,phoneNumber,address})
    }

    update({id,email,password,firstName,lastName,nationalityIdentity,dateOfBirth,phoneNumber,address}){
        return axios.put(this.url + "/update",{id,email,password,firstName,lastName,nationalityIdentity,dateOfBirth,phoneNumber,address})
    }

    delete({id}){
        return axios.delete(this.url + "/delete",{params:id});
    }
}