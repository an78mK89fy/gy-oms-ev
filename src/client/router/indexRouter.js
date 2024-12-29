import { createRouter, createWebHashHistory, createMemoryHistory } from 'vue-router'

import Login from '../views/login/Login.vue'
import Register from '../views/login/Register.vue'
import Menu from '../views/main/Menu.vue'
import Factory from '../views/main/Factory.vue'
import Orders from '../views/main/Orders.vue'

const router = createRouter({
    // history: createMemoryHistory(),
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/menu', component: Menu },
        { path: '/Factory', component: Factory },
        { path: '/orders', component: Orders }
    ]
})

export { router }