import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/home',
  name: 'Home',
  component: Home,
},
{
  path: '/about',
  name: 'About',
  component: () => import('../views/About.vue')
},
{
  path: '/',
  name: 'login',
  component: () => import('../views/user/Login.vue')
},
{
  path: '/stockin',
  name: 'stockin',
  component: () => import('../views/stock/StockIn.vue')
},
{
  path: '/stockout',
  name: 'stockout',
  component: () => import('../views/stock/StockOut.vue')
},
]



const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  //debug
  //return next();

  if (to.path == "/") {
    return next();
  }
  let token = sessionStorage.getItem('token');
  
  if (token === null || token === ''|| token === 'null') {
    return next('/');
  } else {
    return next();
  }

});

export default router