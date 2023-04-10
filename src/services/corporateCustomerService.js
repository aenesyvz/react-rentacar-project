import axios from "axios";
import "../environment.js"
import Constants from "../environment.js";

export default class CorporateCustomerService{
    url = Constants.API_URL + "/corporateCustomers";

    getAll(){
        return axios.get(this.url + "/getAll");
    }

    getById({id}){
        return axios.get(this.url + "/getById",{params:id})
    }

    add({email,password,componyName,taxNo,phoneNumber}){
        return axios.post(this.url + "/add",{email,password,componyName,taxNo,phoneNumber})
    }

    update({id,email,password,componyName,taxNo,phoneNumber}){
        return axios.put(this.url + "/update",{id,email,password,componyName,taxNo,phoneNumber})
    }

    delete({id}){
        return axios.delete(this.url + "/delete",{params:id});
    }
}