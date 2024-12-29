<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router'

import { requestUser } from '../../request/indexRequest.js'

// 登录表单
const form = reactive({
    email: '',
    password: '',
    stay: ''
})
// 登录
const router = useRouter()
function userLogin(formLogin) {
    new Promise(resolve => {
        if (formLogin) { // 表单登录
            if (formLogin.email && formLogin.password) { resolve() } // 检测输入框
            else { ElMessage({ message: '账户和密码不得为空' }) }
        } else { resolve() } // 无表单token登陆验证
    }).then(() => {
        requestUser.login(formLogin).then(res => {
            if (res.data.user) { // 登陆成功
                sessionStorage.setItem('userName', res.data.user.name)
                if (res.data.user.avatar) { sessionStorage.setItem('userAvatar', res.data.user.avatar) }
                router.push('menu')
            } else { ElMessage(res.data.elMessage) } // 登陆失败
        }).catch(result => { if (formLogin) ElMessage({ message: result, type: 'error' }) })
    })
}
userLogin()
</script>

<template>
    <h1 class="title">国友纸业<br>Order Manage System</h1>
    <el-card>
        <h1>login</h1>
        <el-form :model="form" label-width="auto" label-position="top">
            <el-form-item label="账户">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="form.stay" label="保持登录"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="userLogin(form)">登录</el-button>
                <RouterLink to="register"><el-button>注册</el-button></RouterLink>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<style scoped>
h1.title {
    text-align: center;
}

.el-card {
    width: min(max(30%, 500px), 100%);
    margin: auto;
}
</style>