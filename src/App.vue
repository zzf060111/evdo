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
        console.log(this._gap_time)
        // debugger
        //判断是窗口关闭还是刷新
        if(this._gap_time<=3){
          //如果是登录状态，关闭窗口前，移除用户
          // console.log('关闭')
          localStorage.clear();
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
.el-message-box--center{
  width: 300px !important;
  height: 170px !important;
  padding-bottom: 10px !important;
}
.el-message-box__header{
  padding-top: 20px !important;
  background-color: #F1F4F5;
}
.el-message-box__content{
  margin: 10px 0;
}
.errorAlert .el-button{
  background-color: #FF5555;
  border-color: #FF5555;
}
</style>
