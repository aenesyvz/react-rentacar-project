import axios from "axios";
import "../environment.js"

export default class RentalBranchService{
    url = API_URL + "/rentalBranch";

    add({cityId,districtId,name,address,phoneNumber,email}){
        return axios.post(this.url + "/add",{cityId,districtId,name,address,phoneNumber,email});
    }

    update({id,cityId,districtId,name,address,phoneNumber,email}){
        return axios.put(this.url + "/update",{id,cityId,districtId,name,address,phoneNumber,email});
    }

    delete(id){
        return axios.delete(this.url + "/delete",{params:id});
    }

    getAll(){
        return axios.get(this.url + "/getAll");
    }

    getById(id){
        return axios.get(this.url+"/getById",{params:id});
    }
}