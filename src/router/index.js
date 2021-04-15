import Vue from 'vue'
import Router from 'vue-router'
import VueRoute from 'vue-router' 
const Index = () => import('@/page/index')
const Professional = () => import('@/page/professional')
const Enterprise = () => import('@/page/Enterprise')
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
    },
    {
      path: '/enterprise',
      name: 'Enterprise',
      component: Enterprise
    }
  ],
  scrollBehavior(to, from, saveTop) { 
    if (saveTop) { 
      return saveTop; 
    } else { 
      return { x: 0, y: 0 } 
    } 
  },
  mode:'history'
})
