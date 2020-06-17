import axios from "axios";


const http = axios.create({
    baseURL: ""
});


export default {
    signIn: (data: any) => http.post('', data),
}
