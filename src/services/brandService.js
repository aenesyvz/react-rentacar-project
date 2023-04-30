import axios from "axios";
import "../environment.js"
import Constants from "../environment.js";
export default class BrandService{
    url = Constants.API_URL + "/brands";

    add({name}){
        return axios.post(this.url + "/add",{name});
    }

    update({id,name}){
        return axios.put(this.url + "/update",{id,name});
    }

    delete(id){
        return axios.delete(this.url + "/delete/"+ id);
    }

    getAll(){
        return axios.get(this.url + "/getList");
    }

    getById(id){
        return axios.get(this.url + "/getById",{params:id});
    }
}