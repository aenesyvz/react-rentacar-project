import axios from "axios";

export default class InvoiceService{
    url = API_URL + "/invoices";

    add({
        customerId,
        carId,
        no,
        createDate,
        rentalStartDate,
        rentalEndDate,
        totalRentalDate,
        rentalPrice
    }){
        return axios.post(this.url + "/add",{
            customerId,
            carId,
            no,
            createDate,
            rentalStartDate,
            rentalEndDate,
            totalRentalDate,
            rentalPrice
        });
    }

    update({
        id,
        customerId,
        carId,
        no,
        createDate,
        rentalStartDate,
        rentalEndDate,
        totalRentalDate,
        rentalPrice
    }){
        return axios.post(this.url + "/add",{
            id,
            customerId,
            carId,
            no,
            createDate,
            rentalStartDate,
            rentalEndDate,
            totalRentalDate,
            rentalPrice
        });
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