// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Menu,MenuItem,Form,FormItem,Dialog,Button,Input,Message,Carousel,CarouselItem} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Dialog.name, Dialog);
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);
Vue.prototype.$message = Message;

import 'lib-flexible'

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  error:'', //加载失败的图
  loading:'' //加载中的默认图
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
