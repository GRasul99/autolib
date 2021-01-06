import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/store/modules/auth.js'
import * as book from '@/store/modules/book.js'
import * as faculty from '@/store/modules/faculty.js'
import * as order from '@/store/modules/order.js'
import * as university from '@/store/modules/university.js'
import * as user from '@/store/modules/user.js'
import * as udc from '@/store/modules/udc.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    book,
    faculty,
    order,
    university,
    user,
    udc
  }
})

export default store
