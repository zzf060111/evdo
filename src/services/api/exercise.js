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
// 交卷
export function paperSubmit(params){
    return http.get(`/v1/answer/paperSubmit`,params)
}
// 查看错题详情
export function getPaperQuestion(params){
    return http.get(`v1/answer/getPaperQuestion`,params)
}
// 离开考试
export function paperLeave(params){
    return http.get(`/v1/answer/paperLeave`,params)
}
// 答题签到
export function signIn(params){
    return http.get(`v1/answer/signIn`,params)
}
// 错题列表
export function wrongQuestion(params){
    return http.get(`v1/answer/wrongQuestion`,params)
}
// 错题答题
export function wrongQuestionAnswer(params){
    return http.get(`/v1/answer/wrongQuestionAnswer`,params)
}
// 单个移除错题
export function wrongQuestionDel(params){
    return http.get(`v1/answer/wrongQuestionDel`,params)
}
// 清除错题答题记录
export function cleanWrongQuestionAnswer(params){
    return http.get(`v1/answer/cleanWrongQuestionAnswer`,params)
}
// 清空分类下错题
export function cleanWrongQuestion(params){
    return http.get(`v1/answer/cleanWrongQuestion`,params)
}
// 收藏列表
export function favoriteQuestion(params){
    return http.get(`v1/answer/favoriteQuestion`,params)
}
// 收藏题答题
export function favoriteQuestionAnswer(params){
    return http.get(`/v1/answer/favoriteQuestionAnswer`,params)
}
// 清除收藏答题记录
export function cleanFavoriteQuestionAnswer(params){
    return http.get(`v1/answer/cleanFavoriteQuestionAnswer`,params)
}
// 清空分类下收藏题目
export function cleanFavoriteQuestion(params){
    return http.get(`v1/answer/cleanFavoriteQuestion`,params)
}