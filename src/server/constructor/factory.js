import { db } from "../database/db.js"

class Factory extends (await db.constructorPromise('factory')) {
    /**
     * 创建一个新的用户实例。
     * @param {Object} params - 用户属性对象。
     * @param {0 | 1} [params.hidden] - 是否隐藏。
     * @param {string} [params.id] - 唯一标识符。
     * @param {string} params.name - 厂家名。
     * @param {string} params.shortName - 简称。
     * @param {string} params.company - 公司名。
     */
    constructor(params) {
        super(params)
    }
    prop = {
        get basePromise() {

        },
        get brandPromise() {

        }
    }
}

export { Factory }