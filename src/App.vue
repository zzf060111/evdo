<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
</style>
