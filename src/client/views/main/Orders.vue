<script setup>
const generateColumns = (length = 10, prefix = 'column-', props) =>
    Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,
    }))
const generateData = (
    length = 200,
    prefix = 'row-'
) =>
    Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
            (rowData, column, columnIndex) => {
                rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
                return rowData
            },
            {
                id: `${prefix}${rowIndex}`,
                parentId: null,
            }
        )
    })

const columns = generateColumns(10)
const data = generateData(columns, 1000)
</script>

<template>
    <div>
        <el-card>
            <el-form>
                <el-button>下单</el-button>
                <el-form-item label="订单日期">
                    <el-date-picker v-model="value" type="date" placeholder="Pick a day" :size="size" />
                </el-form-item>
                <el-form-item>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button>筛选</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-table>
            <el-table-column></el-table-column>
        </el-table>
    </div>
</template>

<style scoped></style>