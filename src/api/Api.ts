import axios from "axios";


const http = axios.create({
    baseURL: "http://134.122.76.224/api/"
});


export default {
    signIn: (data: any) => http.post('token/', data),
    signUp: (data: any) => http.post('signup/client', data),
    getCategory: () => http.get('category/')
}
