import path from 'node:path'
import crypto from 'node:crypto'
import sqlite3 from 'sqlite3'

import { dbModelSql } from './dbModels.js'

const db = new (sqlite3.verbose()).Database(
    path.join(import.meta.dirname, 'sqlite.db')
)

await Promise.all(
    dbModelSql.map(sql => new Promise(resolve => db.run(sql, () => resolve())))
)

db.constructorPromise = (tableName) => new Promise(resolve => {
    // 查询表的所有列信息
    db.all(`PRAGMA table_info("${tableName}")`, (err, rows) => {
        const columnNames = rows.map(row => row.name) // 提取列名
        // 动态创建类
        class ConstructorDbDynamic {
            constructor(params) {
                // 将传入的数据映射到类的属性上
                columnNames.forEach(column => this[column] = params[column])
                this.id = this.id || crypto.randomUUID()
            }
            static findByIdPromise(id) {
                return new Promise((resolve, reject) => {
                    db.get(
                        `SELECT * FROM "${tableName}" WHERE "id"=?`,
                        [id], (err, row) => err ? reject(err) : resolve(row)
                    )
                })
            }
            static findByColumnPromise(columnName, cellsValue) {
                return new Promise((resolve, reject) => {
                    db.get(
                        `SELECT * FROM "${tableName}" WHERE "${columnName}"=?`,
                        [cellsValue], (err, row) => err ? reject(err) : resolve(row)
                    )
                })
            }
            static listPromise({ filters, columns }) {
                return new Promise((resolve, reject) => {
                    if (filters) {
                        db.all(
                            `SELECT * `
                        )
                    }
                })
            }
            savePromise() {
                return new Promise((resolve, reject) => {
                    if (this.id) {
                        db.get(`SELECT "id" FROM "${tableName}" WHERE "id"=?`, [this.id], (err, row) => {
                            if (err) { return reject(err) }
                            if (row) { // 修改
                                const setCol = columnNames.map(column => `"${column}"=${this[column]}`).join()
                                db.run(
                                    `UPDATE "${tableName}" SET ${setCol} WHERE "id"=?`,
                                    [this.id], err => err ? reject(err) : resolve()
                                )
                            } else { // 创建
                                const InsertCols = columnNames.map(column => `"${column}"`).join()
                                const InsertQ = Array(columnNames.length).fill('?').join()
                                db.run(
                                    `INSERT INTO ${tableName}(${InsertCols}) VALUES(${InsertQ})`,
                                    columnNames.map(column => this[column]),
                                    err => err ? reject(err) : resolve()
                                )
                            }
                        })
                    }
                })
            }
            deletePromise() {
                return new Promise((resolve, reject) => {
                    db.run(
                        `UPDATE "${tableName}" SET "hidden"=1 WHERE "id"=?`,
                        [this.id], err => err ? reject(err) : resolve()
                    )
                })
            }
        }

        // 返回动态创建的类
        resolve(ConstructorDbDynamic)
    })
})

export { db }