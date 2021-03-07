import Vue from 'vue'
import VueRouter from 'vue-router'
import TokenService from '@/services/TokenService'

Vue.use(VueRouter)

const lazyLoad = componentPath => {
  return () =>
    import(/* webpackChunkName: '[request]' */ `@/views/${componentPath}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'categories-list',
    component: lazyLoad('CategoriesList'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/subcategories-list/:id',
    name: 'subcategories-list',
    component: lazyLoad('SubCategoriesList'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/book-list',
    name: 'book-list',
    component: lazyLoad('BookList'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: lazyLoad('Profile'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/change-password/:uid/:token',
    name: 'change-password',
    component: lazyLoad('Auth/ChangePassword')
  },
  {
    path: '/email-confirm/:uid/:token',
    name: 'email-confirm',
    component: lazyLoad('Auth/EmailConfirm')
  },
  {
    path: '/login',
    name: 'login',
    component: lazyLoad('Auth/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: lazyLoad('Auth/Register')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const loggedIn = TokenService.getToken('access')
    if (loggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
