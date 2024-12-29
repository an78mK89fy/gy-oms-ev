// import { db } from "../database/dbModel/podelBaseData.js"

class Paper {
    constructor({ pid, base, brand, race, color, grammage, tag }) {
        this.pid = pid
        this.base = base
        this.brand = brand
        this.race = race
        this.color = color
        this.grammage = grammage
        this.tag = tag
    }
    static findPaperListPromise(pid) {
        return new Promise(resolve => {
            db.get(
                `SELECT * FROM "paperList" WHERE "pid"=?`,
                [pid], (err, row) => { resolve(row) }
            )
        })
    }
    static findPaperStorePromise(sid) {
        return new Promise(resolve => {
            db.get(
                `SELECT * FROM "paperStore" WHERE "sid"=?`,
                [sid], (err, row) => { resolve(row) }
            )
        })
    }
}

function withPaper() {
    return class extends Paper {
        constructor(paper) {
            super(paper)
            this.clearMeasure = 0
        }
        // get soldPromise() {
        //     return new Promise(resolve => {
        //         resolve()
        //     })
        // }
        get clear() {
            return (boolean = 1) => {
                this.clearMeasure = boolean
                return boolean
            }
        }
        get sell() {
            return (sell) => {
                if (this.measure) {
                    const sumSold = this.sold.reduce((previousValue, currentValue) => {
                        return previousValue.n || 0 + currentValue.n || 0
                    }, 0)
                    const result = this.measure - sumSold - sell
                    if (result = 0) { this.clearMeasure() }
                    if (result >= 0) {
                        this.sold.push({ sell, time: Date.now() })
                        return { result: true, message: '销售成功' }
                    }
                }
                return { result: false, message: '超卖' }
            }
        }
    }
}

class PaperSheets extends withPaper() {
    get type() { return '平张' }
    constructor(paper, { sid, width, length, sheets }) {
        super(paper)
        this.sid = sid
        this.measure = sheets
        this.width = width
        this.length = length
    }
}

class PaperSlit extends PaperSheets {
    get type() { return '分切' }
    constructor(optionCut, paper) {
        super(paper, optionCut)
    }
}

class PaperRolls extends withPaper() {
    get type() { return '卷筒' }
    constructor(paper, { sid, width, weight }) {
        super(paper)
        this.sid = sid
        this.measure = weight
        this.width = width
    }
    cutting({ sid, length, sheets }) {
        const paperSheets = new PaperSlit({
            sid,
            sheets,
            length
        }, this)
        return paperSheets
    }
}



// export { Paper, PaperRolls, PaperSheets }