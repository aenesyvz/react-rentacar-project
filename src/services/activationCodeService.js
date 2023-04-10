import axios from "axios";
import "../environment.js"
import Constants from "../environment.js";

export default class ActivationCodeService{
    url = Constants.API_URL + "/activationcode";

    confirm({email,code}){
        return axios.post(this.url + "/confirm",{email,code});
    }

  
}