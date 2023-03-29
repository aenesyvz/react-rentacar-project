import axios from "axios";
import Constants from "../environment";

export default class FuelService{
    url = Constants.API_URL + "/fuels";

    add({name}){
        return axios.post(this.url + "/add",{name});
    }

    update({id,name}){
        return axios.put(this.url +"/update",{id,name});
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