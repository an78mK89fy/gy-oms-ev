import { db } from "../database/db.js"

class User extends (await db.constructorPromise('user')) {
     /**
      * 创建一个新的用户实例。
      * @param {Object} params - 用户属性对象。
      * @param {0 | 1} [params.hidden] - 是否隐藏用户。
      * @param {string} [params.id] - 用户唯一标识符。
      * @param {string} params.name - 用户名。
      * @param {string} params.email - 用户邮箱。
      * @param {string} params.password - 用户密码。
      * @param {string} [params.avatar] - 用户头像URL。
      * @param {number} [params.timeCreate] - 用户创建时间。
      */
     constructor(params) {
          super(params)
          this.timeCreate = params.timeCreate || Date.now()
     }
}


export { User }