import Orm from './prisma'

class Token extends Orm {
    constructor() {
        super()
    }
}

export default new Token()