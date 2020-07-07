import axios from "axios";


const http = axios.create({
    baseURL: "http://134.122.76.224/api/"
});

// @ts-ignore
let token = JSON.parse(localStorage.getItem('userData'));


export default {
    signIn: (data: any) => http.post('token/', data),
    signInWithRefresh: () => http.post('token/refresh/', {
        "refresh": token.refresh_token
    }),
    signUpClient: (data: any) => http.post('signup/client', data),
    signUpConsultant: (data: any) => http.post('signup/consultant', data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }),
    getConsultants: (id: number) => http.get(`/specialty/${id}/consultants/`),
    getCategory: () => http.get(`categories/`),
    getForums: () => http.get(`forums/`),
    getQuestion: (id:number|string) => http.get(`forums/${id}`),
    getUser: (id:number|string) => http.get(`consultants/${id}`)
}



export const ApiToken = {}