import axios from "axios";
import "../environment.js"
import Constants from "../environment.js";

export default class IndividualCustomerService{
    url = Constants.API_URL + "/individualCustomers";

    getAll(){
        return axios.get(this.url + "/getAll");
    }

    getById({id}){
        return axios.get(this.url + "/getById",{params:id})
    }

    add({email,password,firstName,lastName,nationalityIdentity,dateOfBirth,phoneNumber}){
        return axios.post(this.url + "/add",{email,password,firstName,lastName,nationalityIdentity,dateOfBirth,phoneNumber})
    }

    update({id,email,password,firstName,lastName,nationalityIdentity,dateOfBirth,phoneNumber}){
        return axios.put(this.url + "/update",{id,email,password,firstName,lastName,nationalityIdentity,dateOfBirth,phoneNumber})
    }

    delete({id}){
        return axios.delete(this.url + "/delete",{params:id});
    }
}