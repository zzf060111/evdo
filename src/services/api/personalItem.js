import http from '../http'
// 退出登录
export function logout(params){
    return http.post(`/v1/logout`,params)
}
// 获取用户信息
export function info(params){
    return http.get(`/v1/user/info`,params)
}
// 修改用户信息-昵称
export function profile(params){
    return http.post(`/v1/account/profile`,params)
}
// 修改用户信息-头像
export function avatar(params){
    return http.post(`v1/uploader/avatar`,params)
}
// 修改用户信息-密码
export function password(params){
    return http.post(`v1/user/password`,params)
}
// 修改用户信息-手机号
export function mobileReg(params){
    return http.post(`v1/user/mobile`,params)
}
// 每日签到
export function setClockIn(params){
    return http.post(`v1/account/setClockIn`,params)
}
// 加入组织
export function joinReq(params){
    return http.post(`v1/account/join`,params)
}
// 获取手机验证码
export function user_mobile_code(params){
    return http.post(`/v1/user_mobile_code`,params)
}