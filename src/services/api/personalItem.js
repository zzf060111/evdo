import http from '../http'
// 退出登录
export function logout(params){
    return http.post(`/v1/logout`,params)
}
// 获取用户信息
export function info(params){
    return http.get(`/v1/user/info`,params)
}
// 修改用户信息
export function profile(params){
    return http.post(`/v1/account/profile`,params)
}