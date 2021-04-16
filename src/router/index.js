import Vue from 'vue'
import Router from 'vue-router'
import VueRoute from 'vue-router' 
const Index = () => import('@/page/index')
const Professional = () => import('@/page/professional')
const Enterprise = () => import('@/page/enterprise')
const Fslist = () => import('@/page/fsList')
const Fsitem = () => import('@/page/fsItem')
const Search = () => import('@/page/search')
const Personal = () => import('@/page/personal')
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
    },
    {
      path: '/fslist',
      name: 'Fslist',
      component: Fslist
    },
    {
      path: '/fsitem',
      name: 'Fsitem',
      component: Fsitem
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
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
