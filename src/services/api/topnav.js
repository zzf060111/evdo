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
// 第三方登录
export function socials(params){
    return http.get(`/v1/socials`,params)
}
// 微信登陆
export function wechatwebcallback(params){
    return http.get(`v1/socials/wechatwebcallback`,params)
}
// 第三方登陆绑定手机号
export function mobilebind(params){
    return http.post(`/v1/mobile_bind`,params)
}
// QQ登陆
// export function loginqq(params){
//     return http.post(`/v1/oauth2/qq`,params)
// }
// QQ登陆
export function qqcallback(params){
    return http.get(`v1/socials/qqcallback`,params)
}
// 微信绑定
export function wechatBind(params){
    return http.post(`v1/user/oauth2/wechat`,params)
}
// qq绑定
export function QQBind(params){
    return http.post(`v1/user/oauth2/qq`,params)
}