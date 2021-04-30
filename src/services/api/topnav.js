import http from '../http'

// 注册
export function register(params){
    return http.post(`/v1/register`,params)
}
// 获取验证码4位
export function getUserCode(params){
    return http.post(`/v1/getUserCode`,params)
}