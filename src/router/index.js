import Vue from 'vue'
import VueRouter from 'vue-router'
import TokenService from '@/services/TokenService'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'categories-list',
    component: () => import(/* */ '@/views/CategoriesList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/subcategories-list/:id',
    name: 'subcategories-list',
    component: () => import('@/views/SubCategoriesList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/book-list',
    name: 'book-list',
    component: () => import('@/views/BookList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/change-password/:uid/:token',
    name: 'change-password',
    component: () => import('@/views/Auth/ChangePassword.vue')
  },
  {
    path: '/email-confirm/:uid/:token',
    name: 'email-confirm',
    component: () => import('@/views/Auth/EmailConfirm.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Auth/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Auth/Register.vue')
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
