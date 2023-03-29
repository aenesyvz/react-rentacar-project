import axios from "axios";
import "../environment.js"

export default class RentalBranchService{
    url = API_URL + "/rentalBranchs";

    add({cityId,name,address}){
        return axios.post(this.url + "/add",{cityId,name,address});
    }

    update({id,cityId,name,address}){
        return axios.put(this.url + "/update",{id,cityId,name,address});
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