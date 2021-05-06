import http from '../http'

// 注册
export function register(params){
    return http.post(`/v1/register`,params)
}
// 忘记密码
export function passwordReset(params){
    return http.post(`/v1/passwordReset`,params)
}
// 获取验证码6位
export function getUserCode(params){
    return http.post(`/v1/getUserCode`,params)
}
// 登陆
export function login(params){
    return http.post(`/v1/login`,params)
}