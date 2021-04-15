import http from '../http'
// 
let resquest = "https://mock.mengxuegu.com/mock/607407d056076a4a764846af/example/"

// get请求
export function getTestAPI(params){
    return http.get(`${resquest}getTest`,params)
}
// post请求
export function postTestAPI(params){
    return http.post(`${resquest}postUser`,params)
}