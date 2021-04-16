import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state={
    forgetReg:60,
    forgetStr:'获取验证码',
    searchval:''
}
const mutations={
    forgetTime(state){
        var time1
        clearInterval(time1);
        time1=setInterval(()=>{
            if(state.forgetReg>1){
                state.forgetReg--;
                state.forgetStr=`${state.forgetReg}秒后获取`;
            }else{
                state.forgetReg=60;
                state.forgetStr='获取验证码';
                clearInterval(time1);
            }
        },1000)
    },
    changeSearch(state,str){
        state.searchval=str;
    }
}

export default new Vuex.Store({
    state,mutations
})