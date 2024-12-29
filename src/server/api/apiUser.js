import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../constructor/user.js'

const apiUser = express.Router()

apiUser.post('/register', (req, res) => {
    console.log(req.body.form.email)
    User.findByColumnPromise('email', req.body.form.email).then(result => { // 存在邮箱
        if (result) {
            console.log('存在邮箱')
            const [column, value] = Object.entries(result).find(item => item[0] === 'email')
            res.send({ elMessage: { message: `"${column}"已存在"${value}"`, type: 'warning' } })
        } else { // 不存在邮箱
            const user = new User({
                name: req.body.form.name,
                email: req.body.form.email,
                password: bcrypt.hashSync(req.body.form.password, 10),
            })
            user.savePromise()
                .then(() => res.send({ elMessage: { message: `"${user.email}"注册成功`, type: 'success' } }))
                .catch(result => res.send({ elMessage: { message: result, type: 'error' } }))
        }
    }).catch(result => {
        res.send({ elMessage: { message: result, type: 'error' } })
    })
})

apiUser.post('/login', (req, res) => {
    new Promise(resolve => {
        // 账户登录
        if (req.body.form) {
            User.findByColumnPromise('email', req.body.form.email).then(result => {
                // 邮箱存在，且密码正确
                if (bcrypt.compareSync(req.body.form.password, result?.password || '')) {
                    const token = jwt.sign({ id: result.id }, 'tempSalt')
                    res.cookie('token', token, { maxAge: req.body.form.stay ? 3000000000 : undefined })
                    resolve(result)
                }// 邮箱不存在
                else { res.send({ elMessage: { message: '邮箱或密码错误', type: 'warning' } }) }
            }).catch(result => { res.send({ elMessage: { message: result, type: 'error' } }) })
        } else if (req.cookies?.token) { //token登录
            jwt.verify(req.cookies.token, 'tempSalt', (err, decoded) => {
                if (err) {
                    res.send({
                        elMessage: {
                            message: `用户"${decoded?.name}"的token无效`,
                            type: 'error'
                        }
                    })
                } else {
                    User.findByIdPromise(decoded.id).then(result => {
                        if (result) { resolve(result) }
                    }).catch(result => res.send({ elMessage: { message: result, type: 'error' } }))
                }
            })
        }
    }).then(result => { res.send({ user: { name: result.email, avatar: result.avatar } }) })
})

export { apiUser }