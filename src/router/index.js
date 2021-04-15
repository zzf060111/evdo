import Vue from 'vue'
import Router from 'vue-router'
import VueRoute from 'vue-router' 
const Index = () => import('@/page/index')
const Professional = () => import('@/page/professional')
Vue.use(Router)
// 解决多次点击重复路由报错
const originalPush = VueRoute.prototype.push
VueRoute.prototype.push = function( location ){
   return originalPush.call( this,location).catch( err=>err )
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/professional',
      name: 'Professional',
      component: Professional
    }
  ],
  mode:'history'
})
