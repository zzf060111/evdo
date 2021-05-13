import http from '../http'
// 获取功能介绍文章列表
export function getCategoryPostLists(params){
    return http.get(`portal/getCategoryPostLists`,params)
}
// 获取文章详情
export function articles(params){
    return http.get(`portal/articles`,params)
}