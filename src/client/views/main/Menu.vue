<script setup>
import { requestUser } from '../../request/indexRequest.js';

const userName = sessionStorage.getItem('userName')
const userAvatar = sessionStorage.getItem('userAvatar') || sessionStorage.getItem('userName')

</script>

<template>
    <el-container>
        <el-header>
            国友纸业 Order Manage System
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <el-tag v-text="userName"></el-tag>
            <el-button @click="requestUser.logout">注销</el-button>
        </el-header>
        <el-main>
            <el-collapse :modelValue="['business', 'store', 'finance']">
                <el-collapse-item title="仪表盘" name="dashboard"></el-collapse-item>
                <el-collapse-item title="业务" name="business">
                    <RouterLink to="orders">
                        <el-card>销售订单</el-card>
                    </RouterLink>
                    <RouterLink to="factory">
                        <el-card>采购记录</el-card>
                    </RouterLink>
                </el-collapse-item>
                <el-collapse-item title="仓库" name="store">
                    <RouterLink to="orders">
                        <el-card>分切订单</el-card>
                    </RouterLink>
                    <RouterLink to="orders">
                        <el-card>销售出库</el-card>
                    </RouterLink>
                    <RouterLink to="orders">
                        <el-card>库存查询</el-card>
                    </RouterLink>
                    <RouterLink to="orders">
                        <el-card>货物调拨</el-card>
                    </RouterLink>
                    <RouterLink to="orders">
                        <el-card>收货入库</el-card>
                    </RouterLink>
                    <RouterLink to="orders">
                        <el-card>盘点库存</el-card>
                    </RouterLink>
                </el-collapse-item>
                <el-collapse-item title="财务" name="finance">
                    <RouterLink to="factory">
                        <el-card>发票管理</el-card>
                    </RouterLink>
                    <RouterLink to="factory">
                        <el-card>应收账款</el-card>
                    </RouterLink>
                    <RouterLink to="factory">
                        <el-card>应付支出</el-card>
                    </RouterLink>
                </el-collapse-item>
                <el-collapse-item title="档案" name="archives">
                    <RouterLink to="factory">
                        <el-card>供应商</el-card>
                    </RouterLink>
                    <RouterLink to="orders">
                        <el-card>纸</el-card>
                    </RouterLink>
                    <RouterLink to="orders">
                        <el-card>客户</el-card>
                    </RouterLink>
                    <RouterLink to="orders">
                        <el-card>收货地址</el-card>
                    </RouterLink>
                    <RouterLink to="orders">
                        <el-card>国友纸业</el-card>
                    </RouterLink>
                </el-collapse-item>
            </el-collapse>
        </el-main>
    </el-container>
</template>

<style scoped></style>