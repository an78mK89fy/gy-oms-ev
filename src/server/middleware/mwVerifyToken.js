import jwt from 'jsonwebtoken'

const mwVerifyToken = (req, res, next) => {
    jwt.verify(
        req.cookies.token,
        'tempSalt',
        (err, decoded) => {
            if (err) {
                res.send({
                    message: `用户"${decoded.name}"的token无效`,
                    type: 'error'
                })
            } else { next() }
        })
}

export { mwVerifyToken }