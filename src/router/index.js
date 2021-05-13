import Vue from 'vue'
import Router from 'vue-router'
import VueRoute from 'vue-router' 
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
      component:resolve => require(['@/page/index'], resolve)
    },
    {
      path: '/professional',
      name: 'Professional',
      component: resolve => require(['@/page/professional'], resolve)
    },
    {
      path: '/enterprise',
      name: 'Enterprise',
      component: resolve => require(['@/page/enterprise'], resolve)
    },
    {
      path: '/fslist',
      name: 'Fslist',
      component: resolve => require(['@/page/fsList'], resolve)
    },
    {
      path: '/fsitem',
      name: 'Fsitem',
      component: resolve => require(['@/page/fsItem'], resolve)
    },
    {
      path: '/search',
      name: 'Search',
      component: resolve => require(['@/page/search'], resolve)
    },
    {
      path: '/personal',
      name: 'Personal',
      component: resolve => require(['@/page/personal'], resolve)
    },
    {
      path: '/downLoad',
      name: 'DownLoad',
      component: resolve => require(['@/page/downLoad'], resolve)
    },
    {
      path: '/exercise',
      name: 'Exercise',
      component: resolve => require(['@/page/exercise'], resolve)
    },
    {
      path: '/questions',
      name: 'Questions',
      component: resolve => require(['@/page/questions'], resolve)
    },
    {
      path: '/videoItem',
      name: 'VideoItem',
      component: resolve => require(['@/page/videoItem'], resolve)
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
