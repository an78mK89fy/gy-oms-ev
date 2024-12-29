import axios from 'axios'
import { router } from '../router/indexRouter.js'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 3000,
})

const requestUser = {
    register(form) {
        return instance.post('/user/register', { form })
    },
    login(form) {
        return instance.post('/user/login', { form })
    },
    logout() {
        // return instance.delete('/user/logout')
        cookieStore.delete('token').then(() => {
            ElMessage({ message: '注销成功', type: 'success' })
            router.push('/')
        })
    }
}

const requestFactory = {
    save(form) {
        return instance.post('/factory/save', { form })
    },
    delete(param) {
        return instance.delete(`/factory/del/${param}`)
    },
    getList(filters) {
        return instance.post('/factory/list', { filters })
    },
}

const requestBrand = {
    save(form) {
        return instance.post('/factory/brand/save', { form })
    },
    delete() { },
    getList(filters) {
        return instance.post('/factory/brand/list', { filters })
    }
}

export {
    requestUser,
    requestFactory,
    requestBrand
}