<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      _beforeUnload_time:0,
      _gap_time:0
    }
  },
  created(){
  },
  mounted(){
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.addEventListener('unload', e => this.unloadHandler(e))
  },
  destroyed(){
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.removeEventListener('unload', e => this.unloadHandler(e))
  },
  methods:{
    beforeunloadHandler(){
      this._beforeUnload_time=new Date().getTime();
    },
    unloadHandler(e){
        this._gap_time=new Date().getTime()-this._beforeUnload_time;
        // console.log(this._gap_time)
        // debugger
        //判断是窗口关闭还是刷新
        if(this._gap_time<=3){
          //如果是登录状态，关闭窗口前，移除用户
          // console.log('关闭')
          // localStorage.clear();
          localStorage.removeItem('toastVisible');
          localStorage.removeItem('searchval');
        }
    },
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  font-family: Microsoft YaHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
* {
  margin: 0;
  padding: 0;
}
.topNav{
  width: 100%;
  height: 60px;
  position: fixed;
  top:0;
  left:0;
  z-index: 9;
}
/* 公共弹窗 */
.el-message-box--center,.errorAlert.el-message-box--center{
  width: 360px !important;
  height: 240px !important;
  padding-bottom: 10px !important;
  border-radius: 10px !important;
}
.el-message-box__header{
  background-color: #F1F4F5;
}
.el-message-box--center .el-message-box__content{
  padding: 0;
  font-size: 18px;
  margin: 50px 0 48px 0;
}
.el-message-box--center .el-button{
  width: 200px;
  height: 44px;
  font-size: 16px;
}
.el-message-box__content{
  margin: 10px 0;
}
.leftCount.el-message-box--center .el-message-box__content{
  margin: 30px 0 35px 0;
  padding: 0 30px;
}
.leftCount .el-message-box__content{
  text-align: left !important;
}
.errorAlert.el-message-box .el-button{
  background-color: #FF5555 !important;
  border-color: #FF5555  !important;
}
.el-message-box__title{
  font-size: 16px;
  color: #666;
}
.el-message-box__header,.el-message-box__title{
  padding: 0;
  padding-top: 0 !important;
  height: 44px;
}
</style>
