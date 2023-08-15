import Orm from './prisma'
import { sign as createAccessToken } from 'jsonwebtoken'

import { validatePasswordHash } from '../../../functions/password'
import { AppError } from '../../../functions/AppError'

class User extends Orm {
    constructor() {
        super()
    }

    async authenticate(email: string, password: string): Promise<string> {
        if (!password || !email) {
            throw new AppError('Required fields are missing')
        }

        const user = await super.findByEmail(email)

        if (user && await validatePasswordHash(password, user.password)) {
            if (!user.active) {
                throw new AppError('Account deactivated')
            }

            return createAccessToken({}, process.env.EDUSOCIAL_SECRET, {
                subject: user.id,
                issuer: 'EduSocial-API',
                expiresIn: '7d'
            })
        }

        throw new AppError('The email or password is incorrect')
    }
}

export default new User()