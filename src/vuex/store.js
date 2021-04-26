import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state={
    forgetReg:60,
    forgetStr:'获取验证码',
    searchval:localStorage.getItem('searchval')?localStorage.getItem('searchval'):'',
    ops: {
        vuescroll: {
        },
        scrollPanel: {
            scrollingX: false,
            speed: 300,
            easing:'easeInQuad'
        },
        rail: {
            keepShow:true
        },
        bar: {
            hoverStyle: true,
            onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
            background: '#aaa',
        }
    },
    opsx: {
        vuescroll: {
        },
        scrollPanel: {
            speed: 300,
            easing:'easeInQuad'
        },
        rail: {
            keepShow:true
        },
        bar: {
            hoverStyle: true,
            onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
            background: '#aaa',
            size:'12px'
        }
    },
    screenHeight:document.documentElement.clientHeight
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
        localStorage.setItem('searchval',str);
    },
    // 窗口变化
    windowChange(state){
        state.screenHeight = document.documentElement.clientHeight;
        window.onresize = () => {
            return (() => {
                state.screenHeight = document.documentElement.clientHeight;
            })();
        };
    }
}

export default new Vuex.Store({
    state,mutations
})