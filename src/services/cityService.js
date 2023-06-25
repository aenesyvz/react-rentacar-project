import axios from "axios";
import Constants from "../environment";

export default class CityService{
    url = Constants.API_URL + "/city";

    add({plateCode,name}){
        return axios.post(this.url + "/add",{plateCode,name});
    }

    update({id,plateCode,name}){
        return axios.put(this.url + "/update",{id,plateCode,name});
    }

    delete(id){
        return axios.delete(this.url + "/delete/" + id);
    }

    getAll(){
        return axios.get(this.url + "/getAll");
    }

    getById(id){
        return axios.get(this.url + "/getById/"+id);
    }
}