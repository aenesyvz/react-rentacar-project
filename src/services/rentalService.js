import axios from "axios";
import "../environment";

export default class RentalService{
    url = API_URL + "/rentals";

    add({
        carId,
        customerId,
        rentStartRentalBranchId,
        rentEndRentalBranchId,
        rentalStartDate,
        rentalEndDate,
        returnDate,
        rentStartKilometer
    }){
        return axios.post(this.url + "/add",{
            carId,
            customerId,
            rentStartRentalBranchId,
            rentEndRentalBranchId,
            rentalStartDate,
            rentalEndDate,
            returnDate,
            rentStartKilometer
        });
    }


    update({
        id,
        carId,
        customerId,
        rentStartRentalBranchId,
        rentEndRentalBranchId,
        rentalStartDate,
        rentalEndDate,
        returnDate,
        rentStartKilometer
    }){
        return axios.put(this.url + "/update",{
            id,
            carId,
            customerId,
            rentStartRentalBranchId,
            rentEndRentalBranchId,
            rentalStartDate,
            rentalEndDate,
            returnDate,
            rentStartKilometer
        });
    }

    delete(id){
        return axios.delete(this.url + "/delete",{params:id});
    }

    getAll(){
        return axios.get(this.url + "/getAll");
    }

    getById(id){
        return axios.get(this.url + "/getById",{params:id});
    }
}