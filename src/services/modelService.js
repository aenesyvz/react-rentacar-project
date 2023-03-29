import axios from "axios";
import "../environment.js";
import Constants from "../environment.js";

export default class ModelService{
    url = Constants.API_URL + "/models";

    add({brandId,name}){
        return axios.post(this.url,{brandId,name});
    }

    update({id,brandId,name}){
        return axios.put(this.url,{id,brandId,name});
    }

    delete(id){
        return axios.delete(this.url + "/delete",{params:id});
    }

    getById(id){
        return axios.get(this.url + "/getById",{params:id});
    }

    getAll(){
        return axios.get(this.url + "/getAll");
    }
}