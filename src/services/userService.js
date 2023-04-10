import axios from "axios";
import "../environment.js"
import Constants from "../environment.js";

export default class UserService{
    url = Constants.API_URL + "/users";

    sendConfirmCode({email}){
        return axios.post(this.url + "/sendConfirmCode",{email});
    }

    resetPassword({email,newPassword,reNewPassword}){
        return axios.put(this.url + "/resetPassword",{email,newPassword,reNewPassword});
    }

}