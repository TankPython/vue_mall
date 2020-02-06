import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import User from '@/components/User/user.vue'
import Rights from '@/components/rights/rights.vue'
import Roles from '@/components/rights/roles.vue'
import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [{
    name: 'home',
    path: '/',
    component: Home,
    children: [{
      name: 'user',
      path: '/users',
      component: User
    }, {
      name: 'rights',
      path: '/rights',
      component: Rights
    }, {
      name: 'roles',
      path: '/roles',
      component: Roles
    }]
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  }

  ]
})

router.beforeEach((to, from, next) => {
  console.log(to.path, '---hahaha-------------************-', from.path)
  if (to.path !== '/login') {
    console.log('-----------99999')
    const token = sessionStorage.getItem('token')
    if (!token) {
      router.push({ name: 'login' })
      Message.warning('请先登录')
      return
    }
  }
  next()
})

export default router
