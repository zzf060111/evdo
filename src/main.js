// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Menu,MenuItem,Form,FormItem,Dialog,Button,Input,Message,Carousel,CarouselItem,Pagination,MessageBox,Submenu,MenuItemGroup,Upload,Collapse,CollapseItem,Table,TableColumn,Loading,Breadcrumb,BreadcrumbItem,Switch} from 'element-ui'
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
Vue.component(Pagination.name, Pagination);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(Upload.name, Upload);
Vue.component(Collapse.name, Collapse);
Vue.component(CollapseItem.name, CollapseItem);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(BreadcrumbItem.name, BreadcrumbItem);
Vue.component(Switch.name, Switch);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert
// 分享组件
import Share from 'vue-social-share'
import 'vue-social-share/dist/client.css';
import '../node_modules/social-share.js/dist/js/social-share.min.js'
 
Vue.use(Share)
// 动画
import 'vue2-animate/dist/vue2-animate.min.css'
// 滚动条样式
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
Vue.use(vuescroll);

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
