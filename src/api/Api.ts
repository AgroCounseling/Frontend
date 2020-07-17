import axios from "axios";


const http = axios.create({
    baseURL: "http://134.122.76.224/api/"
});

const getToken = () => {
    let data = JSON.parse(localStorage.getItem('userData') as string)
    return data.access_token
}
const getRefreshToken = () => {
    let data = JSON.parse(localStorage.getItem('userData') as string)
    return data.refresh_token
}



export default {
    signIn: (data: any) => http.post('token/', data),
    signInWithRefresh: () => http.post('token/refresh/', {
        "refresh": getRefreshToken()
    }),
    signUpClient: (data: any) => http.post('signup/client', data),
    signUpConsultant: (data: any) => http.post('signup/consultant', data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }),

    getProfile: () => http.get(`profile/`,{
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    }),
    setProfile: (name:string,data:any) => http.put(`profile/edit/${name}/`,data, {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    }),
    getConsultants: (id: string, page: number | string = 1) => http.get(`specialty/${id}/consultants/?page=${page}`),
    getCategory: () => http.get(`categories/`),
    getSpecialty: () => http.get(`specialty/`),
    getForums: (page: number | string, text?: string, filter?: any) => http.get(`forums/?category=${filter ? filter.value : ''}&page=${page}&search=${text ? text : ''}`),
    getQuestion: (id: number | string) => http.get(`forums/${id}`),
    getUser: (id: number | string | undefined) => http.get(`consultants/${id}`),
    getSlider: () => http.get(`slider/`),
    getArticles: (search:string,page:number, category?:number) => http.get(`articles/?search=${search}&category=${category ? category : ''}&page=${page}`),
    getArticle: (id:number | string) => http.get(`articles/${id ? id : ''}`),
}


export const ApiToken = {}