import http from '../http'

// 获取专业版分类
export function professionalCategory(params){
    return http.get(`/v1/home/professionalCategory`,params)
}
// 获取专业列表
export function professionalModel(params){
    return http.getLoad(`/v1/home/professionalModel`,params)
}
// 获取企业版分类
export function enterpriseCategory(params){
    return http.get(`/v1/home/enterpriseCategory`,params)
}
// 获取企业版列表
export function enterpriseModel(params){
    return http.getLoad(`/v1/home/enterpriseModel`,params)
}
// 获取视频详情
export function videoDetail(params){
    return http.get(`/v1/home/videoDetail`,params)
}
// 添加收藏
export function addfavorites(params){
    return http.post('v1/account/favorites',params)
}
// 取消收藏
export function delfavorites(params){
    return http.delete('v1/account/favorites/del',params)
}