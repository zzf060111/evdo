import http from '../http'

// 获取答题分类
export function category(params){
    return http.get(`v1/answer/category`,params)
}
// 获取答题题库
export function question(params){
    return http.get(`v1/answer/question`,params)
}
// 用户答题
export function answer(params){
    return http.get(`/v1/answer/answer`,params)
}
// 收藏取消题目
export function favorite(params){
    return http.get(`v1/answer/favorite`,params)
}
// 重新生成试卷
export function paperReset(params){
    return http.get(`v1/answer/paperReset`,params)
}
// 答题签到
export function signIn(params){
    return http.get(`v1/answer/signIn`,params)
}