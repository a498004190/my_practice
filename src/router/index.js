import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/msite'
  },
  {
    path: '/msite',
    name: 'MSite',
    meta: {
      showFooter: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MSite/MSite')
  },
  {
    path: '/order',
    name: 'Order',
    meta: {
      showFooter: true
    },
    component: () => import('../views/Order/Order')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      showFooter: true
    },
    component: () => import('../views/Profile/Profile')
  },
  {
    path: '/search',
    name: 'Search',
    meta: {
      showFooter: true
    },
    component: () => import('../views/Search/Search')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../views/Shop/Shop'),
    children: [
      {
        path: '/shop/goods',
        name: 'ShopGoods',
        component: () => import('../views/Shop/ShopGoods/ShopGoods')
      },
      {
        path: '/shop/info',
        name: 'ShopInfo',
        component: () => import('../views/Shop/ShopInfo/ShopInfo')
      },
      {
        path: '/shop/ratings',
        name: 'ShopRatings',
        component: () => import('../views/Shop/ShopRatings/ShopRatings')
      },
      {
        path: '',
        redirect: '/shop/goods'
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
