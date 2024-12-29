<script setup>
import { reactive } from 'vue';
import { requestUser } from '../../request/indexRequest.js';
const form = reactive({
    email: '',
    password: '',
    password2: ''
})
function register() {
    if (form.email && form.password && form.password === form.password2) {
        requestUser.register(form).then(res => {
            ElMessage(res.data.elMessage)
        })
    } else { ElMessage({ message: '账户和密码不得为空，且两次密码需一致', type: 'warning' }) }
}
</script>

<template>
    <el-card>
        <h1>register</h1>
        <el-form :model="form" label-width="auto" label-position="top">
            <el-form-item label="账户">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="设置密码">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="验证密码">
                <el-input v-model="form.password2" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="register">申请</el-button>
                <RouterLink to="login"><el-button>返回</el-button></RouterLink>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<style scoped>
.el-card {
    width: min(max(30%, 500px), 100%);
    margin: auto;
}
</style>