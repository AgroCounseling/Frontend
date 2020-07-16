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
    getConsultants: (id: string, page: number | string = 1) => http.get(`specialty/${id}/consultants/?page=${page}`),
    getCategory: () => http.get(`categories/`),
    getSpecialty: () => http.get(`specialty/`),
    getForums: (page: number | string, text?: string, filter?: any) => http.get(`forums/?category=${filter ? filter.value : ''}&page=${page}&search=${text ? text : ''}`),
    getQuestion: (id: number | string) => http.get(`forums/${id}`),
    getUser: (id: number | string | undefined) => http.get(`consultants/${id}`),
    getSlider: () => http.get(`slider/`),
    getArticles: (page:number ) => http.get(`articles/?page=${page}`),
    getArticle: (id:number | string) => http.get(`articles/${id ? id : ''}`),
}


export const ApiToken = {}