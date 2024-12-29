<script setup>
import { ref } from 'vue'
import { requestFactory, requestBrand } from '../../request/indexRequest.js'

const drawerCreateFactory = ref(false)
function closeDrawerCreateFactory(done) {
    ElMessageBox.confirm('确认关闭').then(() => {
        done()
        formFactory.value.id = ''
    })
}

const listFactory = ref([])
requestFactory.getList().then(res => {
    if (res.data.type) { ElMessage(res.data.elMessage) }
    else { listFactory.value = res.data.reverse() }
})
const formFactory = ref({ id: '', name: '', shortName: '', company: '' })
function createFactory() {
    requestFactory.save(formFactory.value).then(res => {
        ElMessage(res.data.elMessage)
        if (res.data.id) {
            listFactory.value.unshift(res.data)
        }
        drawerCreateFactory.value = false
        formFactory.value = {}
    })
}
function delFactory({ $index: index, row: { id } }) {
    requestFactory.delete(id).then(res => {
        ElMessage(res.data.elMessage)
        if (res.data.type === 'success') {
            listFactory.value.splice(index, 1)
        }
    })
}

const dialogManageBrand = ref(false)
const listBrand = ref([])
function openBrandManage(bid) {
    dialogManageBrand.value = true
    requestBrand.getList().then(res => {
        if (res.data.type) { ElMessage(res.data.elMessage) }
        else { listBrand.value = res.data.reverse() }
    })
}
const dialogCreateBrand = ref(false)
const formBrand = ref({ bid: '', name: '', alias: '', id: '' })
function createBrand() {
    requestBrand.save(formBrand.value).then()
}
</script>

<template>
    <el-card>
        <el-button type="primary" @click="drawerCreateFactory = true">+新建</el-button>
        <el-table :data="listFactory" stripe table-layout="auto">
            <el-table-column type="index" label="序"></el-table-column>
            <el-table-column prop="name" label="厂家"></el-table-column>
            <el-table-column label="生产基地" v-slot="scope" align="center">
                <el-badge :value="0"></el-badge>
                <el-button @click="openBrandManage()">管理</el-button>
            </el-table-column>
            <el-table-column label="品牌" v-slot="scope" align="center">
                <el-badge :value="0"></el-badge>
                <el-button @click="openBrandManage()">管理</el-button>
            </el-table-column>
            <el-table-column label="操作" v-slot="scope">
                <el-button type="primary" plain>编辑</el-button>
                <el-button type="danger" plain @click="delFactory(scope)">删除</el-button>
            </el-table-column>
            <el-table-column label="id" v-slot="scope">
                <el-tag v-text="scope.row.id"></el-tag>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="1"></el-pagination>
    </el-card>
    <!-- 弹窗 -->
    <!-- 新建厂家抽屉 -->
    <el-drawer class="createFactory" v-model="drawerCreateFactory" title="新建厂家"
        :before-close="closeDrawerCreateFactory">
        <el-form :model="formFactory" label-width="auto" label-position="top">
            <el-input type="hidden" v-model="formFactory.id"></el-input>
            <el-form-item label="厂家名">
                <el-input v-model="formFactory.name"></el-input>
            </el-form-item>
            <el-form-item label="简称">
                <el-input v-model="formFactory.shortName"></el-input>
            </el-form-item>
            <el-form-item label="公司名">
                <el-input v-model="formFactory.company"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" @click="createFactory" v-text="formFactory.id ? '修改' : '创建'" />
            <el-button @click="closeDrawerCreateFactory">取消</el-button>
        </template>
    </el-drawer>
    <!-- 管理品牌模态框 -->
    <el-dialog class="manageBrand" v-model="dialogManageBrand">
        <el-button @click="dialogCreateBrand = true">添加品牌</el-button>
        <!-- 品牌列表 -->
        <el-table :data="listBrand">
            <el-table-column type="index" label="序"></el-table-column>
            <el-table-column prop="name" label="品牌名"></el-table-column>
            <el-table-column prop="alias" label="别名"></el-table-column>
            <el-table-column prop="bid" label="bid"></el-table-column>

        </el-table>
        <!-- 新建品牌模态框 -->
        <el-dialog class="createBrand" v-model="dialogCreateBrand">
            <el-form :model="formBrand" label-width="auto">
                <el-input type="hidden" v-model="formBrand.bid"></el-input>
                <el-form-item label="品牌名">
                    <el-input v-model="formBrand.name"></el-input>
                </el-form-item>
                <el-form-item label="别名">
                    <el-input v-model="formBrand.alias"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary">添加</el-button>
        </el-dialog>
    </el-dialog>
</template>

<style scoped></style>