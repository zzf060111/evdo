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
// 退出组织
export function quitGroup(params){
    return http.post(`v1/account/quitGroup`,params)
}
// 获取手机验证码
export function user_mobile_code(params){
    return http.post(`/v1/user_mobile_code`,params)
}
// 获取会员套餐列表
export function getVipInfo(params){
    return http.get(`v1/vip/getVipInfo`,params)
}
// 获取会员购买记录
export function getVipOrder(params){
    return http.get(`v1/vip/getVipOrder`,params)
}
// 获取赠送会员记录
export function getVipGive(params){
    return http.get(`v1/vip/getVipGive`,params)
}
// 支付
export function rechargeVip(params){
    return http.post(`v1/pay/web/rechargeVip`,params)
}
// 监听订单状态
export function getPayorder(params){
    return http.get(`v1/pay/order`,params)
}
// 获取收藏列表
export function favorites(params){
    return http.get(`v1/account/favorites`,params)
}
// 删除收藏
export function delfavorites(params){
    return http.delete(`v1/account/favorites/del`,params)
}
// 获取官方问答列表
export function askList(params){
    return http.get(`v1/account/ask`,params)
}
// 提问
export function playAsk(params){
    return http.post(`v1/account/ask`,params)
}
// 追问
export function Askreply(params){
    return http.post(`v1/account/ask/reply`,params)
}
// 结单
export function Askend(params){
    return http.post(`v1/account/ask/end`,params)
}
// 解绑微信QQ
export function oauth2unbind(params){
    return http.post(`v1/user/oauth2unbind`,params)
}
// 获取消息通知
export function notice(params){
    return http.get(`v1/user/notice`,params)
}
// 读取消息
export function noticeRead(params){
    return http.get(`v1/user/noticeRead`,params)
}
// 删除消息
export function systemNoticeDel(params){
    return http.get(`v1/user/systemNoticeDel`,params)
}
// 获取未读消息条数
export function newNoticeNum(params){
    return http.get(`v1/user/newNoticeNum`,params)
}