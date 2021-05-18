import http from '../http'

// 获取答题分类
export function category(params){
    return http.get(`v1/answer/category`,params)
}
// 获取答题题库
export function question(params){
    return http.get(`v1/answer/question`,params)
}