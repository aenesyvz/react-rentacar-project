import axios from "axios";
import Constants from "../environment";

export default class DistrictService{
    url = Constants.API_URL + "/district";

    add({cityId,name}){
        return axios.post(this.url + "/add",{cityId,name});
    }

    update({id,cityId,name}){
        return axios.put(this.url + "/update",{id,cityId,name});
    }

    delete(id){
        return axios.delete(this.url + "/delete/" + id);
    }

    getAll(id){
        return axios.get(this.url + "/getAll/"+id);
    }

    getById(id){
        return axios.get(this.url + "/getById/" + id);
    }
}