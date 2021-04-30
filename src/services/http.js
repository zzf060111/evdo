import request from './axios'

const http ={
    getLoad(url,params){
        const config = {
            method: 'get',
            url:url,
            load:true
        }
        if(params) config.params = params
        return request(config)
    },
    postLoad(url,params){
        const config = {
            method: 'post',
            url:url,
            load:true
        }
        if(params) config.data = params
        return request(config)
    },
    get(url,params){
        const config = {
            method: 'get',
            url:url
        }
        if(params) config.params = params
        return request(config)
    },
    post(url,params){
        const config = {
            method: 'post',
            url:url
        }
        if(params) config.data = params
        return request(config)
    },
    put(url,params){
        const config = {
            method: 'put',
            url:url
        }
        if(params) config.params = params
        return request(config)
    },
    delete(url,params){
        const config = {
            method: 'delete',
            url:url
        }
        if(params) config.params = params
        return request(config)
    }
}
//导出
export default http