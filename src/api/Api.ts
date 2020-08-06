import axios from "axios";


const http = axios.create({
    baseURL: "http://134.122.76.224/ru/api/"
});
const http_g = axios.create({
    baseURL: "http://134.122.76.224/ru/"
})

const getToken = () => {
    let data = JSON.parse(localStorage.getItem('userData') as string)
    return data.access_token
}
const getRefreshToken = () => {
    let data = JSON.parse(localStorage.getItem('userData') as string)
    return data.refresh_token
}
const getTokenType = () => {
    let data = JSON.parse(localStorage.getItem('userData') as string)
    return data.google;
}



export default {
    signIn: (data: any) => http.post('token/', data),
    googleAuth: (data:any) => http_g.post(`auth/convert-token`, data),
    googleRefresh: (data:any) => http_g.post(`auth/token`, data),
    signInWithRefresh: () => http.post('token/refresh/', {
        "refresh": getRefreshToken()
    }),
    signUpClient: (data: any) => http.post('signup/client', data),
    signUpConsultant: (data: any) => http.post('signup/consultant', data, {
        headers: {
            "Content-Type": "application/json"
        }
    }),
    getProfile: () => http.get(`profile/`,{
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    setProfile: (name:string,data:any) => http.put(`profile/edit/${name}/`,data , {
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    getConsultants: (id: string | number, page: number | string = 1) => http.get(`specialty/${id}/consultants/?page=${page}`),
    getCategory: () => http.get(`categories/`),
    getSubCategory: () => http.get(`subcategories/`),
    getSpecialty: () => http.get(`specialty/`),
    getConsultantsList: (page:number = 1) => http.get(`consultants/?page=${page}`),
    getForums: (page: number | string, text?: string, filter?: any) => http.get(`forums/?category=${filter ? filter.value : ''}&page=${page}&search=${text ? text : ''}`),
    getQuestion: (id: number | string) => http.get(`forums/${id}`),
    createQuestion: (data:any) => http.post(`forums/create`, data,{
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    getUser: (id: number | string | undefined) => http.get(`consultants/${id}`),
    getSlider: () => http.get(`slider/`),
    getTypes: () => http.get(`types/`),
    getSubTypes: () => http.get(`subtypes/`),
    getVotesUser: (id:number) => http.get(`votes/self/${id}`, {
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    getArticles: (search:string,page:number, category?:number, subcategory?: number,types?: string, subType?: string) => http.get(`articles/?search=${search}&category=${category ? category : ''}&subcategory=${subcategory ? subcategory : ''}&page=${page}&types=${types ? types : ''}&subTypes=${subType ? subType : ''}`),
    getPopularArticles: (search:string,page:number, category?:number, subcategory?: number,types?: string, subType?: string) => http.get(`popular-articles/?search=${search}&category=${category ? category : ''}&subcategory=${subcategory ? subcategory : ''}&page=${page}&types=${types ? types : ''}&subTypes=${subType ? subType : ''}`),
    getNewArticles: (search:string,page:number, category?:number, subcategory?: number,types?: string, subType?: string) => http.get(`new-articles/?search=${search}&category=${category ? category : ''}&subcategory=${subcategory ? subcategory : ''}&page=${page}&types=${types ? types : ''}&subTypes=${subType ? subType : ''}`),
    getArticle: (id:number | string) => http.get(`articles/${id ? id : ''}`),
    putLike: (id:number, data:any) => http.post(`votes/create/${id}`, data , {
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    createArticle: (data:any) => http.post(`articles/create`, data, {
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    }),
    setAnswer: (data:any) => http.post(`comments/create`, data, {
        headers: {
            "Authorization": getTokenType() ? "Bearer " + getToken() : "JWT " + getToken()
        }
    })
}


export const ApiToken = {}