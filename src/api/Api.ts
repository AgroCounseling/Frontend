import axios from "axios";


const http = axios.create({
    baseURL: "http://134.122.76.224/api/"
});

let token = JSON.parse(<string>localStorage.getItem('userData'));


export default {
    signIn: (data: any) => http.post('token/', data),
    signInWithRefresh: () => http.post('token/refresh/', {
        "refresh": token.refresh_token
    }),
    signUp: (data: any) => http.post('signup/client', data),
    getCategory: () => http.get('categories/')
}


export const ApiToken = {}