import Vue from 'vue'
import Vuex from 'vuex'
import { Message} from 'element-ui';

Vue.use(Vuex);

const state={
    forgetStr:localStorage.getItem('endTime')?localStorage.getItem('endTime')>new Date().getTime()?`${Math.ceil((localStorage.getItem('endTime')-new Date().getTime())/1000)}秒后获取`:'获取验证码':'获取验证码',
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
            size:'3px'
        }
    },
    screenHeight:document.documentElement.clientHeight,
    arrUser:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):''
}
const mutations={
    forgetTime(state){
        var time1;
        clearInterval(time1);
        var time=Math.ceil((localStorage.getItem('endTime')-new Date().getTime())/1000);
        time1=setInterval(()=>{
            if(time>1){
                time--;
                state.forgetStr=`${time}秒后获取`;
            }else{
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
    },
    // 公共提示
    alertTxt(state,res){
        Message({
            showClose: true,
            message:res.msg,
            type:res.type,
            onClose:res.fun?res.fun:()=>{}
        })
    },
    // 改变用户信息
    changeUser(state,str){
        if(str){
            state.arrUser=JSON.parse(str);
            localStorage.setItem('user',str);
        }else{
            state.arrUser='';
            localStorage.removeItem('user');
        }
        
    },
}

export default new Vuex.Store({
    state,mutations
})